document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('transaction-id')) {
        const transactionId = urlParams.get('transaction-id');
        verificarPagoConWompi(transactionId);
    } else {
        alert('No se pudo procesar el pago.');
    }
});

async function verificarPagoConWompi(transactionId) {
    try {
        const response = await fetch(`https://sandbox.wompi.co/v1/transactions/${transactionId}`);
        const data = await response.json();

        if (data.status === 'APPROVED') {
            alert('Pago aprobado. Gracias por tu compra.');
        } else {
            alert('El pago no fue aprobado.');
        }
    } catch (error) {
        console.error('Error al verificar el pago:', error);
    }
}
