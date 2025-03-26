import * as Yup from "yup";

const createWarrantySchema = Yup.object().shape({
  name: Yup.string().required("Please enter the warranty term!"),
});

export default createWarrantySchema;
