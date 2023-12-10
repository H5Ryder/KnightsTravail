
class hNode
{
    constructor(arr, parent = null)
    {
        this.x= arr[0];
        this.y = arr[1];
        this.children = [];
        this.parent = parent;
        
    }
}



function knightMoves(start,end){


  let root = new hNode(start);
  let coord = [root.x,root.y];
  let board = [coord];
  console.log(` Starting board ${board}`);
  let target = new hNode(end);


  const inBounds = (node) => node.x > -1 && node.x < 8 && node.y > -1 && node.y < 8;

  const isFree = (node) => {
    return !board.some(([x, y]) => x === node.x && y === node.y);
  };
  
  const boardFull = (board) => (board.length >= 64);
  const addToBoard = (newNodes) => {
    newNodes.forEach(child => board.push([child.x,child.y]));
  }

  const possibleMoves = (node) => {
    const xVal = node.x;
    const yVal = node.y;
    const moves = [
      new hNode([xVal + 1, yVal + 2],node),
      new hNode([xVal - 1, yVal + 2],node),
      new hNode([xVal + 2, yVal + 1],node),
      new hNode([xVal - 2, yVal + 1],node),
      new hNode([xVal + 2, yVal - 1],node),
      new hNode([xVal - 2, yVal - 1],node),
      new hNode([xVal + 1, yVal - 2],node),
      new hNode([xVal - 1, yVal - 2],node),
    ];


    // Filter moves that are in bounds and not in the occupiedNodes array
    let validMoves = moves.filter(node => inBounds(node));
    validMoves = validMoves.filter(node => isFree(node));


  
    return validMoves;
  };
  const nodeValsMatch = (node1,node2) => ((node1.x === node2.x) && (node1.y === node2.y));

  const journey = (node, arr = []) => {

    if (node === root){
      arr.unshift([node.x,node.y]);

      arr.forEach(node => console.log(`[${node[0]},${node[1]}]`));
      
      return arr;
    }

    arr.unshift([node.x,node.y]);

    return journey(node.parent, arr);

  }

  const buildTree = (queue = [root]) => {
    let currentNode = queue.shift();
    console.log(`****************************`);
    console.log(`Parent: [${currentNode.x},${currentNode.y}]`);
  
    console.log('Board:');
    board.forEach((element) => {
      console.log(`[${element[0]},${element[1]}]`);
    });
  
    // Did we find the target?
    if (nodeValsMatch(currentNode, target)) {
      target = currentNode;
      console.log(`Solution found at Pos[${currentNode.x},${currentNode.y}]`);
      return 'found'; // Signal that a solution is found
    }
  
    // Find next level of moves -> Add to the board
    let newNodes = possibleMoves(currentNode);
  
    // Check if solution is found in the new nodes
    for (const element of newNodes) {
      if (nodeValsMatch(element, target)) {
        target = element;
        console.log(`Solution found at Pos[${element.x},${element.y}]`);
        return 'found'; // Signal that a solution is found
      }
    }
  
    addToBoard(newNodes);
  
    // Board full?
    if (boardFull(board)) {
      console.log('Board Full!');
      return false;
    }
  
    // Assign children to the current node
    currentNode.children = newNodes;
  
    console.log(`Children:`);
    currentNode.children.forEach((child) => console.log(`[${child.x},${child.y}]`));
  
    // Assign children to the queue
    currentNode.children.forEach((child) => queue.push(child));
  
    console.log(`Queue:`);
    queue.forEach((child) => console.log(`[${child.x},${child.y}]`));
  
    // Recursively call buildTree and check for the 'found' signal
    const result = buildTree(queue);
    if (result === 'found') {
      return 'found'; // Propagate the signal up the recursion
    }
  
    // Continue with the rest of the function
    return result;
  };
  

 

  
  
  buildTree();
  console.log(`------SUMMARY------`)
  console.log(`Start: [${root.x},${root.y}], Goal: [${target.x},${target.y}]`)
  console.log('Journey:');
  console.log(`Steps: ${journey(target).length-1}`);

      



}



knightMoves([0,0], [7,3]);

