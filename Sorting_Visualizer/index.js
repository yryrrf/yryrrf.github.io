

function clearCanvas(){
  ctx.clearRect(0, 0, rectRight, rectBottom);
}

async function wait(ms){
  await sleep(ms);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


