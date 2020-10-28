function inputCheck(deptCity, arrCity) {
    let cityRGEX = /^[a-zA-Z\s]{0,255}$/;
    if (cityRGEX.test(deptCity) && cityRGEX.test(arrCity)) {
    return
  } else {
    alert("Enter valid City");
  }
}

export { inputCheck }