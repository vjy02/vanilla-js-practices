import {fetchData} from "./data.js"

async function main(){
    const treeRef = document.getElementById("tree")
    const dataArr = await fetchData()
    createBranches(dataArr, treeRef)
}

function createBranches(nodeArr, parentRef){
    nodeArr.forEach((node)=>{
        const newNode = document.createElement("details")
        const textNode = document.createElement("summary")
        textNode.id = node.id
        textNode.textContent = node.name
        newNode.appendChild(textNode)
        if (node.children){
            textNode.classList.add("folder");
            const newParentNode = document.createElement("ul")
            newNode.appendChild(newParentNode)
            createBranches(node.children, newParentNode)
        }
        parentRef.appendChild(newNode)
    })
}

main()