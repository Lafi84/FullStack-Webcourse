const jwt = require('jsonwebtoken');
const _ = require('lodash');
const uuidv1 = require('uuid/v1');
const {ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server');
const mongoose = require('mongoose');
const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');
require('dotenv').config();

const pubsub = new PubSub();

mongoose.set('useFindAndModify', false);

// eslint-disable-next-line no-undef
const MONGODB_URI = process.env.MONGODB_URI;

console.log('connecting to to', MONGODB_URI);

mongoose.connect(MONGODB_URI, {useNewUrlParser: true})
	.then(() => {
		console.log('connected to MongoDB');
	})
	.catch((error) => {
		console.log('error connection to MongoDB:', error.message);
	});


let authors = [
	{
		name: 'Robert Martin',
		id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
		born: 1952,
	},
	{
		name: 'Martin Fowler',
		id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
		born: 1963
	},
	{
		name: 'Fyodor Dostoevsky',
		id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
		born: 1821
	},
	{
		name: 'Joshua Kerievsky', // birthyear not known
		id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
	},
	{
		name: 'Sandi Metz', // birthyear not known
		id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
	},
];

/*
 * It would be more sensible to assosiate book and the author by saving
 * the author id instead of the name to the book.
 * For simplicity we however save the author name.
*/

let books = [
	{
		title: 'Clean Code',
		published: 2008,
		author: 'Robert Martin',
		id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
		genres: ['refactoring']
	},
	{
		title: 'Agile software development',
		published: 2002,
		author: 'Robert Martin',
		id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
		genres: ['agile', 'patterns', 'design']
	},
	{
		title: 'Refactoring, edition 2',
		published: 2018,
		author: 'Martin Fowler',
		id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
		genres: ['refactoring']
	},
	{
		title: 'Refactoring to patterns',
		published: 2008,
		author: 'Joshua Kerievsky',
		id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
		genres: ['refactoring', 'patterns']
	},
	{
		title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
		published: 2012,
		author: 'Sandi Metz',
		id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
		genres: ['refactoring', 'design']
	},
	{
		title: 'Crime and punishment',
		published: 1866,
		author: 'Fyodor Dostoevsky',
		id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
		genres: ['classic', 'crime']
	},
	{
		title: 'The Demon',
		published: 1872,
		author: 'Fyodor Dostoevsky',
		id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
		genres: ['classic', 'revolution']
	},
];

const typeDefs = gql`
	type User {
	  username: String!
	  favoriteGenre: String!
	  id: ID!
	}
	
	type Token {
	  value: String!
	}

  type Author {
    id: ID!
  	name: String!
  	born: Int
  	bookCount: Int!
  }
  
  type Book {
    id: ID!
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks (author: String, genre: String): [Book!]
    allAuthors (name: String): [Author!]
  	me: User
  }
  
  type Subscription {
  	bookAdded: Book!
  }    
  
  type Mutation {
  	addBook (
  		title: String!
  		author: String!
  		published: Int!
  		genres: [String!]!
  	): Book
  	
  	editAuthor (
  		name: String!
  		setBornTo: Int!
  	): Author
  	
	createUser(
		username: String!
		favoriteGenre: String!
	  ): User
	  
	login(
		username: String!
		password: String!
	): Token
  }
`;

const resolvers = {
	Query: {
		bookCount: () => Book.collection.countDocuments(),
		authorCount: () => {
			// const authorMap = _.groupBy(books, 'author');
			// return Object.keys(authorMap).length;
			return Author.collection.countDocuments();
		},
		allBooks: async (root, args) => {
			const findAuthor = args.author;
			const findGenre = args.genre;
			// return books.filter(book => (!findAuthor || book.author.toUpperCase() === findAuthor.toUpperCase()))
			// 	.filter(book => (!findGenre || book.genres.filter(genre => genre.toUpperCase() === findGenre.toUpperCase()).length > 0));

			const books = await Book.find(findGenre ? {genres: findGenre} : {}).populate({path: 'author', match: findAuthor ? {name: findAuthor} : {}}).exec();
			return books.filter(book => !findAuthor || book.author);
		},
		allAuthors: async (root, args) => {
			const findAuthor = args.name;
			// let authorMap = _.groupBy(books, 'author');
			// return authors.filter(author => (!findAuthor || author.name === findAuthor))
			// 	.map(author => {
			// 		return {
			// 			id: author.id,
			// 			name: author.name,
			// 			born: author.born,
			// 			bookCount: authorMap[author.name].length
			// 		};
			// 	});

			const authors = await Author.find(findAuthor ? {name: findAuthor} : {});
			await Promise.all(authors.map(async author => {
				const books = await Book.find({}).populate({path: 'author', match: {name: author.name}}).exec();
				// eslint-disable-next-line require-atomic-updates
				author.bookCount = books.filter(book => book.author).length;
			}));

			return authors;
		},
		me: async (root, args, context) => {
			return context.currentUser;
		}
	},
	Mutation: {
		addBook: async (root, args, {currentUser}) => {
			// const author = authors.find(author => author.name === args.author);
			// if (!author)
			// 	authors = authors.concat({id: uuidv1(), name: args.author});
			//
			// const book = {...args, id: uuidv1()};
			// books = books.concat(book);
			// return book;

			if (!currentUser) {
				throw new AuthenticationError('not authenticated');
			}

			let author = await Author.findOne({ name: args.author });
			console.log(author);
			try{
				if (!author) {
					author = new Author({name: args.author});
					await author.save();
				}

				let createdBook = await new Book({ ...args, author: author._id }).save();
				createdBook = await createdBook.populate('author').execPopulate();

				pubsub.publish('BOOK_ADDED', { bookAdded: createdBook });

				return createdBook;
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			}
		},
		editAuthor: async (root, args, {currentUser}) => {
			// let editAuthor = authors.find((author) => author.name === args.name);
			// if (!editAuthor)
			// 	return null;
			//
			// let authorMap = _.groupBy(books, 'author');
			//
			// editAuthor = {...editAuthor, born: args.setBornTo, bookCount: authorMap[editAuthor.name].length};
			// authors = authors.map(author => author.name === args.name ? editAuthor : author);

			if (!currentUser) {
				throw new AuthenticationError('not authenticated');
			}

			if(args.setBornTo<1850)
				throw new UserInputError('Born year must be higher than 1850',{
					invalidArgs: {setBornTo: args.setBornTo}
				});
			if(args.setBornTo>new Date().getUTCFullYear())
				throw new UserInputError('Born year must be lower than current year',{
					invalidArgs: {setBornTo: args.setBornTo}
				});

			try{
				const editAuthor = await Author.findOne({name: args.name}).exec();
				if(!editAuthor)
					return null;
				console.log(editAuthor);
				editAuthor.born = args.setBornTo;

				const books = await Book.find({}).populate({path: 'author', match: {name: editAuthor.name}}).exec();
				editAuthor.bookCount = books.filter(book => book.author).length;
				return editAuthor;
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			}
		},
		createUser: (root, args) => {
			const user = new User({ ...args });

			return user.save()
				.catch(error => {
					throw new UserInputError(error.message, {
						invalidArgs: args,
					});
				});
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username });

			if ( !user || args.password !== 'secret' ) {
				throw new UserInputError('wrong credentials');
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			};

			// eslint-disable-next-line no-undef
			return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
		},
	},
	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		const auth = req ? req.headers.authorization : null;
		if (auth && auth.toLowerCase().startsWith('bearer ')) {
			const decodedToken = jwt.verify(
				// eslint-disable-next-line no-undef
				auth.substring(7), process.env.JWT_SECRET
			);
			const currentUser = await User.findById(decodedToken.id).populate('friends');
			return { currentUser };
		}
	}
});

server.listen().then(({url, subscriptionsUrl}) => {
	console.log(`Server ready at ${url}`);
	console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});