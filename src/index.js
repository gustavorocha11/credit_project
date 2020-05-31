const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

let dividas = [];

app.get('/dividaAcumulada/:id_cliente', (req, res) => {
  const { id_cliente } = req.params;

  const findCliente = dividas.find((divida) => {
    //console.log(divida.cliente.id === Number(id_cliente));
    return divida.cliente.id == id_cliente;
  });

  if (findCliente) {
    res.json({
      divida: findCliente.divida_acumulada,
    });
  } else {
    return res.status(404).json({ mensagem: 'cliente nao encontrado' });
  }
});

app.get('/dividas', (req, res) => res.json(dividas));

app.get('/cliente/:id_cliente', (req, res) => {
  const { id_cliente } = req.params;

  axios.get(`http://localhost:3000/clientes/${id_cliente}`).then(
    (response) => {
      /*
      const data = response.data;
      const id = data.id;
      const nome = data.nome;
      const cpf = data.cpf;
      */
      const { id, nome, cpf } = response.data;

      res.json({
        id,
        nome_completo: nome,
        cpf,
      });
    },
    (error) => res.status(404).json({ mensagem: 'cliente nao encontrado' })
  );
});

app.get('/cliente/:id_cliente/endereco', (req, res) => {
  const { id_cliente } = req.params;

  axios.get(`http://localhost:3000/clientes/${id_cliente}`).then(
    (response) => res.json(response.data.endereco),
    (error) => res.status(404).json({ mensagem: 'cliente nao encontrado' })
  );
});

app.get('/cliente/:id_cliente/dividas', (req, res) => {
  const { id_cliente } = req.params;

  axios.get(`http://localhost:3000/clientes/${id_cliente}`).then(
    (response) => {
      const { listaDividas } = response.data;

      const totalDividas = listaDividas.reduce(
        (total, obj) => (total += obj.valor),
        0
      );

      /*
      let totalDividas = 0;
      listaDividas.forEach((divida) => {
        totalDividas = totalDividas + divida.valor;
      });
      */

      dividas.push({
        cliente: id_cliente,
        divida_acumulada: totalDividas,
      });

      res.json(listaDividas);
    },
    (error) => res.status(404).json({ mensagem: 'cliente nao encontrado' })
  );
});

app.listen(3333, () => {
  setInterval(() => {
    carregarDados();
  }, 10000);

  console.log('Server running');
});

function carregarDados() {
  console.log('Carregando dados...', new Date());
  axios.get(`http://localhost:3000/clientes`).then(
    (response) => {
      dividas = [];

      const clientes = response.data;

      clientes.forEach((cliente) => {
        const { listaDividas } = cliente;

        const totalDividas = listaDividas.reduce(
          (total, obj) => (total += obj.valor),
          0
        );

        dividas.push({
          cliente,
          divida_acumulada: totalDividas,
          data_ultima_consulta: new Date(),
        });
      });
    },
    (error) => console.log(erro)
  );
}
