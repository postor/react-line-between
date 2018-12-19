export default (initValue = 0) => {
  let val = initValue
  return () => val++
}