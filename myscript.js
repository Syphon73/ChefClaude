const HF_TOKEN = "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"

const inp = document.getElementById("text-inp")
const btn = document.getElementById("call-model")
const outp = document.getElementById("text-output")
let Addbtn = document.getElementById("add-item")
const newitem = document.getElementById("item")
const listItems = document.getElementsByTagName('li')



Addbtn.addEventListener('click', () => {
    let item = document.createElement('li')
    let livtext = document.createTextNode(inp.value)
    item.appendChild(livtext)
    newitem.appendChild(item);
   
    inp.value = " ";
})


function getItems() {
    let string = "";
    for (let i = 0; i < listItems.length; i++){
        string += listItems[i].textContent
        string += " "
    }
    return string
}


btn.addEventListener('click', () => {
    async function query(data) {
        const response = await fetch(
            "https://router.huggingface.co/v1/chat/completions",
            {
                headers: {
                    Authorization: `Bearer ${HF_TOKEN}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();
        return result;
    }
    let allitems = getItems();

    query({ 
        
        messages: [
            {
                role: "user",
                content: `${allitems}`,
            },
        ],
        
        model: "openai/gpt-oss-120b:together",
    }).then((response) => {
        // console.log(JSON.stringify(response));
        console.log(response)
        outp.textContent = response.choices[0].message.content
    });
})


