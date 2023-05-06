export default (fn) => function(...args) {
  let next = args[args.length - 1];
  return Promise.resolve(fn(...args)).catch(next);
}