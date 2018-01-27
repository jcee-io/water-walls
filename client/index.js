const errorMessage = document.getElementById('error-message');

const handler = ({ key, target }, object) => {
  if(key !== 'Enter') return;
  const params = target.value;

  let walls = axios.get(`/api/${target.value}`)

  object.value = '';
};