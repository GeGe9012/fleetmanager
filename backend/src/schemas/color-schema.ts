import * as Yup from "yup";

const createColorSchema = Yup.object().shape({
  name: Yup.string().required("Please enter the color!"),
});

export default createColorSchema;
