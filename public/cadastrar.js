document.getElementById('cadastroForm').addEventListener('submit', async function(event) {
            event.preventDefault();

            const nome = document.getElementById('nome').value;

            const response = await fetch('cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome })
            });

            const result = await response.json();
            alert(result.message);
        });