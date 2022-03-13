async function async2() {
  console.log("async2");
}

async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

export function runTest() {
  console.log("script start");
  async1();
  new Promise<void>((res, rej) => {
    console.log("promise1");
    res();
  }).then(() => {
    console.log("promise2");
  });
  console.log("script end");
}

export async function sleep(duration: number) {
  await new Promise<void>((res) => {
    setTimeout(res, duration);
  });
}
