//javascript map, filter, find and reduce functions

const person = [
    {
        name: 'John',
        salary: 320
    },{
        name: 'Neha',
        salary: 220
    },{
        name: 'Anu',
        salary: 320
    }

]

//Map 
const mapPerson = person.map((person) => {
    return person.name.toUpperCase()
});
console.log("Output for Map method - " + mapPerson);

//Filter all person name having salary greater than 300
//Filter returns output in array
const filterPerson = person.filter((person) => {
    return person.salary > 300
});
filterPerson.forEach((person) => {
    console.log("Output for Filter method - " + person.name);
});

//Find the first person name having salary greater than 300
//Find returns output in object
const findPerson = person.find((person) => {
    return person.salary > 300
});
console.log("Output for Find method - " + findPerson.name);

//Reduce the salary of all persons
//Reduce returns output in single value
const reducePerson = person.reduce((total, person) => {
    return total+person.salary
},0);
console.log("Output for Reduce method - " + reducePerson);




//Fetch unique category values 
const items = [ 
    {
        name:'eggs',
        category: 'Breakfast'
    },
    {
        name:'Milk',
        category: 'Breakfast'
    },
    {
        name:'DalRice',
        category: 'Lunch'
    },
    {
        name:"Bread",
        category: 'Breakfast'
    }, 
    {
        name:'Pizza',
        category: 'Dinner'
    }

]

const categories = [...new Set(items.map((item) => {
    return item.category
}))]
console.log("Output for unique category values - " + categories);


//Destructuring array in javascript
const fruits = ['Apple', 'Banana', 'Orange', 'Mango'];
const [apple, , Orange, mango] = fruits;
console.log("Output for Destructuring - " + apple + " " + Orange + " " + mango);

let first = "Neha";
let second = "Anu";
[second,first] = [first, second];
console.log("Output for Destructuring - " + first + " " + second);

//Destructuring object in javascript
const personObj = {
    name: 'John',
    age: 30,
    city: 'New York',
    siblings: {
        brother: 'Mike',
        sister: 'Sara'
    }
}

const {name:fullname, city, siblings:{sister:sis}} = personObj;
console.log(fullname + " " + city + " " + sis);

//rest operator in javascript
// rest operator is used when declaring a function
const getAvg = (name, ...rest) => {
    const avg = rest.reduce((total, val) =>  total+val , 0)/rest.length;
    console.log(`Avg of student with name ${name} is ${avg}` );
}

getAvg("Neha", 35,56,7,8);

//spread operator in javascript
//spread operator is used when calling/invoking a function
const marks = [ 45,46,78,99,100];
getAvg("Anu", ...marks);


//optional chaining 
const people = [
    {
        name: 'Bob',
        location: { street: "2323 ahd cbsjd", zip: 679748},
        timezone: {offset: '+7.00'}
    },
    {
        name: 'Neha',
        location: { street: "2323 ahd cbsjd", zip: 679748},
    },
    {
        name: 'Anu',
        location: { street: "2323 ahd cbsjd", zip: 679748},
    }
]

// in the above array if you see the fields in json are very inconsisted, if we want to get all timezones, we will get an error 
//if we directly try to access it - this is where optional chaining comes into picture, if that value doesnt exists it returns undefined
people.forEach((person) => {
    console.log(person?.timezone && person?.timezone?.offset)
});


//callbacks -  A callback is a function passed as an argument to another function. 
function reverseString(str) {
    console.log(str.split('').reverse().join(''))
}
function makeCapital(str) {
    console.log(str.toUpperCase());
}

function handleStr(name, cb) {
    cb(name);
}

handleStr("Neha", reverseString);
handleStr("Neha",makeCapital);
handleStr("Neha",(name)=>console.log(name.toLowerCase()));


//callback hell - watch coding addict callback hell video
  
//Callback hell, also referred to as the “pyramid of doom,” is a situation where multiple nested callbacks 
//are used to handle asynchronous operations in JavaScript. 


//Javascript promises
//promises are an objext that returns a value, which we hope to receive in the future
//example - when you go to a restaurant and order, they dont give your order right away , they give you a bill, which is in this s
//situation similar to a promise
//a promise can be - pending, rejected, or fulfilled
 

const value = 2;
const promise = new Promise((resolve, reject) => {
    const random = Math.floor(Math.random()*3); // this will always generate numbers between - [0,3)
    //if my value matches with random value , then i resolve the request , otherwise i reject
    console.log(random)
    if(value === random) {
        resolve("You guessed correctly")
    } else {
        reject("please guess again");
    }
})

promise.then((data) => console.log(data)).catch((data) => console.log(data));

//to watch an other example , watch coding addict video - https://www.youtube.com/watch?v=GKVA6jYrgKc&list=PLnHJACx3NwAfRUcuKaYhZ6T5NRIpzgNGJ&index=16&ab_channel=CodingAddict 


//async and await
//to use await, async must always be present, and returns a promise
//when you use await, code waits there until the promise is settled
  
//example :1
const example = async() => {
    return "hello there";
}

async function someFunc() {
    const res= example();
    console.log(res);
}

someFunc();

//example:2

const users = [
    {
        id : 1,
        name: "Neha"
    }, {
        id: 2,
        name: "Anu"
    }, {
        id :3,
        name: "Jpn"
    }
]

const articles = [
    {
        userid: 1,
        articles: ["one","two","three"]
    },{
        userid: 2,
        articles: ["four","five"]
    },{
        userid: 3,
        articles: ["six","seven","eight"]
    },
]

const getUser = (name) => {
    return new Promise((resolve, reject) => {
        const user = users.find((x) => name === x.name);
        if(user) {
            resolve(user);
        } else {
            reject("User not found");
        }
    })
}

const getArticles = (userid) => {
    return new Promise((resolve, reject) => {
        const article = articles.find((id) => id.userid === userid);
        if(article) {
            resolve(article.articles);
        } else {
            reject("articles not found")
        }
    })
}

//calling without using async and await
getUser("Neha")
.then((data) => getArticles(data.id))
.then((data) => console.log(data))
.catch((data) => console.log(data));


//now writing code using async and await
const fetchArticles = async (name) => {
    try {
        const user = await getUser(name)
        if(user) {
            const article  =await getArticles(user.id);
            console.log(article);
        } 
    } catch(error) {
        console.log(error)
    }
    
}

fetchArticles("Anus");

//Timestamps
 
console.log(new Date())
 