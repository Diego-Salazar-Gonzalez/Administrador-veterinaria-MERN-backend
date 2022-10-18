import nodemailer from 'nodemailer';


const emailRegistro = async (datos)=>{
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 587,
        auth: {
          user: "e6796b0e71df8d",
          pass: "b7f69a17e8b742"
        }
      });

    const {email,nombre,token} = datos;
    
    //Enviar email
    
    const info = await transport.sendMail({
        from: "APV-Administrador de Pacientes de veterinaria",
        to:email,
        subject:'Comprueba tu cuenta APV',
        text: 'Comprueba tu cuenta en APV',
        html:`<p>Hola: ${nombre}, comprueba tu cuenta en APV</p>
            <p>Tu cuenta ya esta lista,solo debes comprobarla en el siguiente enlace:
            <a href="http://127.0.0.1:5173/confirmar/${token}">Comprobar Cuenta</a></p>

            <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        ` 
    });

    console.log("Mensaje enviado: %s",info.messageId)
    
}

export default emailRegistro;