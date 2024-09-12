import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [gastos, setGastos] = useState([]);
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [valor, setValor] = useState('');

  useEffect(() => {
    const gastosSalvos = JSON.parse(localStorage.getItem('gastos')) || [];
    setGastos(gastosSalvos);
  }, []);

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos));
  }, [gastos]);

  const adicionarGasto = () => {
    if (nome === '' || data === '' || valor === '') {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    const novoGasto = {
      nome,
      data,
      valor: parseFloat(valor.replace(',', '.'))
    };

    setGastos([...gastos, novoGasto]);
    setNome('');
    setData('');
    setValor('');
  };

  const removerGasto = (index) => {
    const novosGastos = gastos.filter((_, i) => i !== index);
    setGastos(novosGastos);
  };

  const totalGastos = gastos.reduce((total, gasto) => total + gasto.valor, 0);

  const handleValorChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    const formattedValue = (Number(value) / 100).toFixed(2).replace('.', ',');
    setValor(formattedValue);
  };

  return (
    <div className="container">
      <h1>Registro de Gastos</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Nome do gasto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <input
          type="text"
          placeholder="Valor"
          value={valor}
          onChange={handleValorChange}
        />
        <button onClick={adicionarGasto}>Adicionar Gasto</button>
      </div>

      <ul className="gastos-lista">
        {gastos.map((gasto, index) => (
          <li key={index} className="gasto-item">
            {gasto.nome} - {gasto.data} - R$ {gasto.valor.toFixed(2).replace('.', ',')}
            <button onClick={() => removerGasto(index)} className="btn-remover">Remover</button>
          </li>
        ))}
      </ul>

      <h2 className="total-gastos">Total Gasto: R$ {totalGastos.toFixed(2).replace('.', ',')}</h2>
    </div>
  );
}

export default App;
