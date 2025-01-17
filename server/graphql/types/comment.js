module.exports = ({ nexus }) => nexus.objectType({
  name: "CommentSingle",
  definition(t) {
    t.id("id")
    t.nonNull.string("content")
    t.boolean("blocked")
    t.boolean("blockedThread")
    t.boolean("removed")
    t.string("approvalStatus")
    t.field("threadOf", { type: 'CommentSingle' })
    t.field("author", { type: 'CommentAuthor' })
    t.string("createdAt")
    t.string("updatedAt")
  }
})