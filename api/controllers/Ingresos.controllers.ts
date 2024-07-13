import { Request, Response } from "express";
import { connect } from "../BD/Accesos_BD";

export const ObtenerIngresos = async (req: Request, res: Response) => {
    let con;
    let result;
    try {
        con = await connect();
        let query = 'SELECT * FROM vistaingresos';
        const ingresos = (await con.query(query))[0] as any[];
        result = ingresos;
    } catch (error) {
        console.log('Error en Ingresos');
        console.log(error);
        result = null;
    } finally {
        await con?.end();
        return res.json(result);
    }
};

export const PostIngresos = async (req: Request, res: Response) => {
    let con;
    let result;
    const {
        Fecha, SegmentoID, CategoriaID, SubcategoriaID, ConceptoID, Descripcion,
        Proveedor, Piezas, CajaChica, Monto, Saldo, Comprobante, EstatusComprobacionID,
        FechaAutorizacion, UsuarioAutorizaID, UsuarioRecibeID, FechaConciliacion, ObservacionesDifConciliacion
    } = req.body;

    console.log("estos datos recibo en PostIngresos", req.body);

    try {
        con = await connect();

        const query = `
            INSERT INTO ingresos (
                Fecha, SegmentoID, CategoriaID, SubcategoriaID, ConceptoID, Descripcion,
                Proveedor, Piezas, CajaChica, Monto, Saldo, Comprobante, EstatusComprobacionID,
                FechaAutorizacion, UsuarioAutorizaID, UsuarioRecibeID, FechaConciliacion, ObservacionesDifConciliacion
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            Fecha, SegmentoID, CategoriaID, SubcategoriaID, ConceptoID, Descripcion,
            Proveedor, Piezas, CajaChica, Monto, Saldo, Comprobante, EstatusComprobacionID,
            FechaAutorizacion, UsuarioAutorizaID, UsuarioRecibeID, FechaConciliacion, ObservacionesDifConciliacion
        ];

        console.log('Ejecutando query:', query);
        console.log('Con valores:', values);

        await con.query(query, values);
        console.log('Query ejecutado exitosamente.');
        result = { message: 'Ingreso creado exitosamente' };
    } catch (error) {
        console.log('Error en Ingresos');
        console.log(error);
        result = { message: 'Error al crear el ingreso' };
    } finally {
        await con?.end();
        console.log('Conexión a la base de datos cerrada.');
        return res.json(result); // Asegúrate de que siempre estás enviando una respuesta
    }
};

export const UpdateIngresos = async (req: Request, res: Response) => {
    let con;
    let result;
    const {
        IngresoID, Fecha, SegmentoID, CategoriaID, SubcategoriaID, ConceptoID, Descripcion,
        Proveedor, Piezas, CajaChica, Monto, Saldo, Comprobante, EstatusComprobacionID,
        FechaAutorizacion, UsuarioAutorizaID, UsuarioRecibeID, FechaConciliacion, ObservacionesDifConciliacion
    } = req.body;

    try {
        con = await connect();
        const query = `
            UPDATE ingresos SET
                Fecha = ?, SegmentoID = ?, CategoriaID = ?, SubcategoriaID = ?, ConceptoID = ?, Descripcion = ?,
                Proveedor = ?, Piezas = ?, CajaChica = ?, Monto = ?, Saldo = ?, Comprobante = ?, EstatusComprobacionID = ?,
                FechaAutorizacion = ?, UsuarioAutorizaID = ?, UsuarioRecibeID = ?, FechaConciliacion = ?, ObservacionesDifConciliacion = ?
            WHERE IngresoID = ?
        `;
        const values = [
            Fecha, SegmentoID, CategoriaID, SubcategoriaID, ConceptoID, Descripcion,
            Proveedor, Piezas, CajaChica, Monto, Saldo, Comprobante, EstatusComprobacionID,
            FechaAutorizacion, UsuarioAutorizaID, UsuarioRecibeID, FechaConciliacion, ObservacionesDifConciliacion,
            IngresoID
        ];

        await con.query(query, values);
        result = { message: 'Ingreso actualizado exitosamente' };
    } catch (error) {
        console.log('Error en Ingresos');
        console.log(error);
        result = { message: 'Error al actualizar el ingreso' };
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
        const conceptos = (await con.query(query))[0] as any[];
        result = conceptos;
    } catch (error) {
        console.log('Error en Conceptos');
        console.log(error);
        result = null;
    } finally {
        await con?.end();
        return res.json(result);
    }
};

export const ObtenerSegmentos = async (req: Request, res: Response) => {
    let con;
    let result;
    try {
        con = await connect();
        let query = 'SELECT * FROM Segmentos';
        const segmentos = (await con.query(query))[0] as any[];
        result = segmentos;
    } catch (error) {
        console.log('Error en Segmentos');
        console.log(error);
        result = null;
    } finally {
        await con?.end();
        return res.json(result);
    }
};

export const ObtenerCategorias = async (req: Request, res: Response) => {
    let con;
    let result;
    try {
        con = await connect();
        let query = 'SELECT * FROM Categorias';
        const categorias = (await con.query(query))[0] as any[];
        result = categorias;
    } catch (error) {
        console.log('Error en Categorias');
        console.log(error);
        result = null;
    } finally {
        await con?.end();
        return res.json(result);
    }
};

export const ObtenerSubcategorias = async (req: Request, res: Response) => {
    let con;
    let result;
    try {
        con = await connect();
        let query = 'SELECT * FROM Subcategorias';
        const subcategorias = (await con.query(query))[0] as any[];
        result = subcategorias;
    } catch (error) {
        console.log('Error en Subcategorias');
        console.log(error);
        result = null;
    } finally {
        await con?.end();
        return res.json(result);
    }
};

export const ObtenerUsuarios = async (req: Request, res: Response) => {
    let con;
    let result;
    try {
        con = await connect();
        let query = 'SELECT * FROM Usuarios';
        const usuarios = (await con.query(query))[0] as any[];
        result = usuarios;
    } catch (error) {
        console.log('Error en Usuarios');
        console.log(error);
        result = null;
    } finally {
        await con?.end();
        return res.json(result);
    }
};

export const ObtenerCombinaciones = async (req: Request, res: Response) => {
    let con;
    let result;
    try {
        con = await connect();
        let query = 'SELECT * FROM Combinaciones';
        const combinaciones = (await con.query(query))[0] as any[];
        result = combinaciones;
    } catch (error) {
        console.log('Error en Combinaciones');
        console.log(error);
        result = null;
    } finally {
        await con?.end();
        return res.json(result);
    }
};

export const ObtenerEstatus = async (req: Request, res: Response) => {
    let con;
    let result;
    try {
        con = await connect();
        let query = 'SELECT * FROM EstatusComprobacion';
        const estatus = (await con.query(query))[0] as any[];
        result = estatus;
    } catch (error) {
        console.log('Error en Estatus');
        console.log(error);
        result = null;
    } finally {
        await con?.end();
        return res.json(result);
    }
};