"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _File = require('../models/File'); var _File2 = _interopRequireDefault(_File);

class AlunoController {
  async index(req, res) {
    const alunos = await _Aluno2.default.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [_File2.default, 'id', 'DESC']],
      include: {
        model: _File2.default,
        attributes: ['url', 'originalname', 'filename'],
      },
    });
    return res.json(alunos);
  }

  async store(req, res) {
    try {
      const aluno = await _Aluno2.default.create(req.body);

      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const aluno = await _Aluno2.default.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [_File2.default, 'id', 'DESC']],
        include: {
          model: _File2.default,
          attributes: ['url', 'originalname', 'filename'],
        },
      });

      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID'],
        });
      }

      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const aluno = await _Aluno2.default.findByPk(id);

      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID'],
        });
      }

      const newStudent = await aluno.update(req.body);

      return res.json(newStudent);
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const aluno = await _Aluno2.default.findByPk(id);

      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID'],
        });
      }

      await aluno.destroy();

      return res.json('Aluno deletado com sucesso');
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }
}

exports. default = new AlunoController();
