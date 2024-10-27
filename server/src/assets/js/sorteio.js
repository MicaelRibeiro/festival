function sorteio(participantes) {
  const numeros = participantes.map(({ id }) => id);
  numeros.sort((a, b) => Math.random() * 2 - 1);

  let rodada = 0;

  return () => {
    const vencedor = participantes.find(({ id }) => id === numeros[rodada]);
    rodada += 1;

    alert(`O vencedor é o código ${vencedor.id}.\n${vencedor.name}`);

    if (rodada === participantes.length) {
      rodada = 0;
    }
  };
}
