import sequelize from '../utils/db';
import User from './user.model';
import Post from './post.model';

User.hasMany(Post, { foreignKey: 'user_id' });
Post.belongsTo(User, { foreignKey: 'user_id' });

sequelize.sync({ force: true }); // Change `force` to false for production.

export { sequelize, User, Post };
