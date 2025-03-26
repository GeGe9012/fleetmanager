import * as Yup from "yup";

const createMakeSchema = Yup.object().shape({
  name: Yup.string().required("Please enter the make!"),
});

export default createMakeSchema;
