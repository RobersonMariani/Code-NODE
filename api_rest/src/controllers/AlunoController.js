import Aluno from '../models/Aluno';
import File from '../models/File';

class AlunoController {
  async index(req, res) {
    const alunos = await Aluno.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [File, 'id', 'DESC']],
      include: {
        model: File,
        attributes: ['url', 'originalname', 'filename'],
      },
    });
    return res.json(alunos);
  }

  async store(req, res) {
    try {
      const aluno = await Aluno.create(req.body);

      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const aluno = await Aluno.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [File, 'id', 'DESC']],
        include: {
          model: File,
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
      const aluno = await Aluno.findByPk(id);

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
      const aluno = await Aluno.findByPk(id);

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

export default new AlunoController();
