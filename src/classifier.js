import { convertCompilerOptionsFromJson } from "typescript";

function classifier(input) {
  // clone the input
  let inputClone = [...input];
  //check if the input is an array
  if (!Array.isArray(input)) {
    throw Error("Invalid inputClone");
  }

  // check if the input has one element
  if (input.length == 0) {
    return { noOfGroups: 0 };
  }
  let sample = [];

  // function to calculate age
  const ageCal = (date) => {
    return new Date(2019, 0, 1).getFullYear() - new Date(date).getFullYear();
  };

  //adding calculated age to the given input
  inputClone.forEach((curr) => {
    const name = curr.name;
    const dob = curr.dob;
    const regNo = curr.regNo;
    const age = ageCal(curr.dob);

    sample.push({ name: name, dob: dob, regNo: regNo, age: age });
  });

  // sort the input with the calculated age
  const sortedBy = sample.sort(function (a, b) {
    return a.age - b.age;
  });

  // sorting the input based on difference of age <= 50

  let sections = [sortedBy[0]]; // temporary array and puting first element as case study
  let new_arr = []; // the permanet array to receive the groups

  for (let i = 1; i < sortedBy.length; i++) {
    if (sortedBy[i].age - sections[0].age <= 5 && sections.length <= 2) {
      sections.push(sortedBy[i]);
    } else {
      new_arr.push(sections);
      sections = [];
      sections.push(sortedBy[i]);
    }
  }
  // when we have just one element in the temporary array which is lesser than 3, we still have to push to permanent array

  if (sections.length) {
    new_arr.push(sections);
  }

  // using object leterals to create the final housing object
  let result = {};

  // creating number of group with the total number of sub arrays in the total array
  result.noOfGroups = new_arr.length;

  // creating oldest, sum, regNos of the students
  const eachGroup = new_arr.map((current) => {
    return {
      members: current.map((each) => ({
        name: each.name,
        age: each.age,
        dob: each.dob,
        regNo: each.regNo,
      })),
      oldest: current[current.length - 1].age,
      sum: current.reduce((accumulator, current) => {
        return accumulator + current.age;
      }, 0),
      regNos: current.map((a) => Number(a.regNo)).sort((a, b) => a - b),
    };
  });
  // console.log(eachGroup)

  // made the object dynamic
  eachGroup.forEach((each, index) => {
    const groupNum = `group${index + 1}`;
    result = { ...result, [groupNum]: each };
  });

  return result;
}

export default classifier;
