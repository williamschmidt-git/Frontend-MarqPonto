export async function getInputs () {
  const request = await fetch(`${process.env.REACT_APP_API}`);

  const response = request.json();

  return response;
}