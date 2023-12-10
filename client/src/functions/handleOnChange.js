export default function handleOnChange(setState, event, name, value) {
  setState((prev) => ({
    ...prev,
    [event ? event.target.name : name]: event ? event.target.value : value,
  }));
}
