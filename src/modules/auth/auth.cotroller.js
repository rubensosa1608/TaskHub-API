import { loginSchema, registerSchema } from "./auth.validators.js";
import { signToken, verifyToken } from "../../utils/jwt.js";

export class AuthController {
  constructor(AuthService) {
    this.AuthService = AuthService;

    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  async register(req, res, next) {
    try {
      const result = registerSchema.safeParse(req.body);

      if (!result.success) {
        const errors = result.error?.errors?.map((e) => e.message) || [
          "Error de validación",
        ];
        const er = new Error(errors.join(", "));
        er.status = 400;
        throw er;
      }

      const { email, password } = result.data;

      const existingUser = await this.AuthService.findUserByEmail(email);
      if (existingUser) {
        const er = new Error("El correo electrónico ya está en uso");
        er.status = 409;
        throw er;
      }

      const newUser = await this.AuthService.createUser(email, password);

      res.status(201).json({
        message: "Usuario registrado exitosamente",
        status: "success",
        user: newUser,
      });
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const result = loginSchema.safeParse(req.body);

      if (!result.success) {
        const errors = result.error?.errors?.map((e) => e.message) || [
          "Error de inicio de sesión",
        ];
        const er = new Error(errors.join(", "));
        er.status = 400;
        throw er;
      }

      const { email, password } = result.data;
      const user = await this.AuthService.findUserByEmail(email);

      const passwordsMatch = await this.AuthService.comparePasswords(
        password,
        user.password,
      );
      const token = signToken(user);

      // Mejoras de seguridad para la cookie del token
      // res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' });

      if (!passwordsMatch) {
        const er = new Error("Correo electrónico o contraseña incorrectos");
        er.status = 401;
        throw er;
      }

      res.status(200).json({
        message: "Inicio de sesión exitoso",
        status: "success",
        user: { id: user.id, email: user.email },
        token,
      });
    } catch (err) {
      next(err);
    }
  }
}
