
async function fetchData() {
  const response = await fetch('API_URL'); 
  const data = await response.json();
  return data.services; 
}

function buildTree(services) {
  const tree = {};
  services.forEach(service => {
    service.children = [];
    tree[service.id] = service; 
  });
  services.forEach(service => {
    if (service.head !== null) {
      tree[service.head].children.push(service);
    }
  });
  return Object.values(tree).filter(service => service.head === null);
}


function generateHTML(node, depth = 0) {
  let html = `<div style="margin-left: ${depth * 20}px">${node.name} (${node.price})</div>`;
  if (node.children.length > 0) {
    node.children.forEach(child => {
      html += generateHTML(child, depth + 1);
    });
  }
  return html;
}

function displayTree(tree) {
  const rootElement = document.getElementById('tree'); 
  tree.forEach(node => {
    rootElement.innerHTML += generateHTML(node);
  });
}


async function init() {
  const services = await fetchData();
  const tree = buildTree(services);
  displayTree(tree);
}

init();
