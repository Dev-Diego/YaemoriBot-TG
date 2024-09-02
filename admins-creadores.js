const DC = require('./global');
const logCommand = require('./log/logcommand');

const isAdmin = async (ctx) => {
    const chatMembersCount = await ctx.getChatMembersCount();
    const member = await ctx.getChatMember(ctx.message.from.id);
    return member.status === 'administrator' || member.status === 'creator';
};

const isOwner = async (ctx) => {
    const chatMembersCount = await ctx.getChatMembersCount();
    const member = await ctx.getChatMember(ctx.message.from.id);
    return member.status === 'creator';
};

module.exports = { isAdmin, isOwner };