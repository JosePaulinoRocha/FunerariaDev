import { Request, Response } from "express";
import { connect } from "../BD/Accesos_BD";

export const Login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    let con;
    let result;
    try {
      con = await connect();
      const query = 'SELECT * FROM usuarios WHERE email = ?';
      const users = (await con.query(query, [email]))[0] as any[];
      if (users.length > 0) {
        const user = users[0];
        if (user.password === password) {
          result = user;
        } else {
          result = null;
        }
      } else {
        result = null;
      }
    } catch (error) {
      console.log('Error en Login');
      console.log(error);
      result = null;
    } finally {
      await con?.end();
      if (result) {
        return res.json({ success: true, user: result });
      } else {
        return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
      }
    }
  }

export const ObtenerUsuarios = async (req: Request, res: Response) => {
    let con;
    let result;
    try {
        con = await connect();
        let query = 'SELECT * FROM usuarios';
        const Users = (await con.query(query))[0] as any[];
        result = Users;
    } catch (error) {
        console.log('Error en Usuarios');
        console.log(error);
        result = null;
    } finally {
        await con?.end();
        return res.json(result);
    }
};


export const PostUsers = async (req: Request, res: Response) => {
  let con;
  let result;
  const { fullName, phone, email, isAdmin } = req.body;
  try {
      con = await connect();

      // Verificar si ya existe un usuario con el mismo email
      let query = 'SELECT COUNT(*) AS count FROM usuarios WHERE email = ?';
      const [rows] = await con.query(query, [email]);

      // rows debería contener el resultado de la consulta
      if ((rows as any).length > 0 && (rows as any)[0].count > 0) {
          result = { message: 'Email already exists. User not created.' };
      } else {
          // Si no existe, proceder con la inserción
          query = 'INSERT INTO usuarios (fullName, phone, email, isAdmin, password) VALUES (?, ?, ?, ?, ?)';
          const values = [fullName, phone, email, isAdmin, 123456];
          await con.query(query, values);
          result = { message: 'User created successfully' };
      }
  } catch (error) {
      console.log('Error en Usuarios');
      console.log(error);
      result = { message: 'Error creating user' };
  } finally {
      await con?.end();
      return res.json(result);
  }
};


export const UpdateUser = async (req: Request, res: Response) => {
    let con;
    let result;
    const { userId, fullName, phone, email, isAdmin } = req.body;
    try {
        con = await connect();
        let query = 'UPDATE usuarios SET fullName = ?, phone = ?, email = ?, isAdmin = ? WHERE userId = ?';
        const values = [fullName, phone, email, isAdmin, userId];
        await con.query(query, values);
        result = { message: 'User updated successfully' };
    } catch (error) {
        console.log('Error en Usuarios');
        console.log(error);
        result = { message: 'Error updating user' };
    } finally {
        await con?.end();
        return res.json(result);
    }
};
