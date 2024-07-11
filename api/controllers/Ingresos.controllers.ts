import { Request, Response } from "express";
import { connect } from "../BD/Accesos_BD";

export const ObtenerIngresos = async (req: Request, res: Response) => {
    let con;
    let result;
    try {
        con = await connect();
        let query = 'SELECT * FROM vistaingresos';
        const Users = (await con.query(query))[0] as any[];
        result = Users;
    } catch (error) {
        console.log('Error en Ingresos');
        console.log(error);
        result = null;
    } finally {
        await con?.end();
        return res.json(result);
    }
};

export const ObtenerConceptos = async (req: Request, res: Response) => {
    let con;
    let result;
    try {
        con = await connect();
        let query = 'SELECT * FROM Conceptos';
        const Users = (await con.query(query))[0] as any[];
        result = Users;
    } catch (error) {
        console.log('Error en Conceptos');
        console.log(error);
        result = null;
    } finally {
        await con?.end();
        return res.json(result);
    }
};