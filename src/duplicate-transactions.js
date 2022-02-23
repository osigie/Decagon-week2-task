import input from "../fixtures/input/edge-input";

function findDuplicateTransactions(transactions) {
  // clone the initial input
  let cloneTransactions = [...transactions];

  // check if the input is an arry
  if (!Array.isArray(transactions)) {
    throw Error;
  }
  // check if the input length is equal to one
  if (input.length == 1 && input.length) {
    return [];
  }

  //first, i am sorting transactions that have the same properties apart from time
  let firstCat = [];

  // sorting with id
  cloneTransactions.sort((a, b) => {
    return a.id - b.id;
  });

  // initializing temporary array with first element
  let tem = [cloneTransactions[0]];

  for (let i = 1; i < cloneTransactions.length; i++) {
    if (
      cloneTransactions[i].sourceAccount === tem[0].sourceAccount &&
      cloneTransactions[i].targetAccount === tem[0].targetAccount &&
      cloneTransactions[i].category === tem[0].category &&
      cloneTransactions[i].amount === tem[0].amount
    ) {
      tem.push(cloneTransactions[i]);
    } else {
      // console.log(tem)
      firstCat.push(tem);
      tem = [];
      tem.push(cloneTransactions[i]);
    }
  }
  // pushed the last element in the temporary array to the permanent array

  if (firstCat.length) {
    firstCat.push(tem);
  }
  // after grouping, i check for the sub arrays with length > 1

  let realUn = [];
  for (const each of firstCat) {
    if (each.length > 1) {
      realUn.push(each);
    }
  }

  console.log(realUn);

  //sorting with time
  let realResult = [];
  let tempResult = [realUn[0]];

  for (let i = 0; i < realUn.length; i++) {
    if (calTime(realUn[i].time) - calTime(tempResult[0].time) < 1) {
      tempResult.push(realUn[i]);
    } else {
      realResult.push(tempResult);
      tempResult = [];
      tempResult.push(realUn[i]);
    }
  }
  return realResult;
}



export default findDuplicateTransactions;
