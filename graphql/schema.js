const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull
} = require('graphql');

const User = require('../models/User');
const Product = require('../models/Product');

// 🧍‍♂️ User Type
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString }
        // Do NOT expose password
    })
});

// 📦 Product Type
const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        quantity: { type: GraphQLInt },
        user: {
            type: UserType,
            resolve(parent) {
                return User.findById(parent.user);
            }
        },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString }
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        users: {
            type: new GraphQLList(UserType),
            resolve() {
                return User.find();
            }
        },
        products: {
            type: new GraphQLList(ProductType),
            resolve() {
                return Product.find();
            }
        },
        product: {
            type: ProductType,
            args: { id: { type: GraphQLID } },
            resolve(_, args) {
                return Product.findById(args.id);
            }
        }
    }
});

// Mutations    
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // 👤 Register User
        registerUser: {
            type: UserType,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(_, args) {
                const existingUser = await User.findOne({ email: args.email });
                if (existingUser) throw new Error('User already exists');
                const newUser = new User(args);
                return await newUser.save();
            }
        },

        // 📦 Create Product
        createProduct: {
            type: ProductType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                quantity: { type: new GraphQLNonNull(GraphQLInt) },
                user: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(_, args) {
                const product = new Product(args);
                return product.save();
            }
        }
    }
});

// Export the schema
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
