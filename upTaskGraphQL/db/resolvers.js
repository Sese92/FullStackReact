
const courses = [
    {
        title: 'React native from zero to hero',
        technology: 'React native'
    },
    {
        title: 'Vue from zero to hero',
        technology: 'Vue'
    },
    {
        title: 'Angular from zero to hero',
        technology: 'Angular'
    },
    {
        title: 'React from zero to hero',
        technology: 'React'
    }
]

const resolvers = {
    Query: {
        getCourses: () => courses,

        getTechnology: () => courses
    }
}

module.exports = resolvers;