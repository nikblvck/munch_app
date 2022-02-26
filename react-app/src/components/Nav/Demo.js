import { useDispatch } from "react-redux";
import { login } from "../../store/session";

const DemoUser = () => {
  const dispatch = useDispatch();

  const loginDemo = () => {
    dispatch(login("demo", "password" ));
  };

  return (
    <>
      <button onClick={loginDemo}>Demo</button>
    </>
  );
};

export default DemoUser;
