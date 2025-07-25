const { log } = require("node:console");

const fetchData = ()=>{
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = { message: "Hello, World!" };
        resolve(data);
      }, 2000);
    })
    
}

async function display(){

    
    const data  = await fetchData();
  
    console.log(data.message);


    

    
    
}


console.log("1");


display();


console.log("4");






