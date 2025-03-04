import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "A névnek legalább 3 karakter hosszúnak kell lennie!")
    .required("Kérlek, add meg a neved!"),
  email: Yup.string()
    .email("Érvényes email címet adj meg!")
    .required("Kérlek, add meg az email címed!"),
  password: Yup.string()
    .min(6, "A jelszónak legalább 6 karakter hosszúnak kell lennie!")
    .required("Kérlek, adj meg egy jelszót!"),
  terms: Yup.bool().oneOf([true], "El kell fogadnod a feltételeket!"),
  modelYear: Yup.date()
    .required("Az évjárat megadása kötelező") // Ellenőrizd, hogy string legyen a hibaüzenet!
    .typeError("Érvényes évszámot adj meg!"),
});

export default validationSchema;
