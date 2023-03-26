import React from 'react'
import Faq from './Blog';
const blogs = [
    {
        id: 1,
        que: 'What are the different ways to manage a state in a React application?',
        ans: 'There are many ways to handle state in React application. We can store state in url, State can stored in web storage.The third option is to use store state locally. It is useful when one component needs the state.The Fourth option is to define the state in the parent component. Often, the same state is used across multiple components. In those cases, it is useful to lift the state to a common parent. The lifting state is a twostep process.The fifth option is to compute the new state based on the available state and we do not need to declare a state at all. '
    },
    {
        id: 2,
        que: 'How does prototypical inheritance work?',
        ans: 'The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Each object has a private property which holds a link to another object called its prototype. That prototype object has a prototype of its own, and so on until an object is reached with null as its prototype.',
    },
    {
        id:3,
        que:'What is a unit test? Why should we write unit tests?',
        ans: 'Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.'
    },
    {
        id:4,
        que: 'React vs. Angular vs. Vue?',
        ans: 'Angular, React, and Vue are the most popular frameworks for any project that has something to do with JavaScript, from creating mobile, small-scale applications to building intuitive user interfaces for business web apps. Angular is a TypeScript-based JavaScript framework. Angular is the perfect choice for those who wish to create refined Single Page Applications (SPA). The frameworks two-way data binding. React is the most popular front-end JavaScript framework of today.lightweight declarativeVue is another open-source JS Framework. Vue combines two essential aspects of its rivals: Angular’s two-way data binding and React’s virtual DOM. Free and open-source like the others, Vue distinguishes itself as a flexible and lightweight framework.'

    }

]

const Blogs = () => {
    return (
        <div className='bg-[#fef8f8] w-full dark:bg-[#00052b] text-white'>
            <div className='container flex items-center justify-center h-[89vh]'>
                <div className='md:w-1/2 p-5 bg-white dark:bg-[#00000083] shadow mx-auto rounded'>
                    {
                        blogs.map(blog => <Faq key={blog.id} {...blog} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default Blogs;