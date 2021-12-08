package com.PacientesHospital;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class Paciente {


    @Id 
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String Nome;
    private String Local;
    private String Inicio;
    private String Fim;
    private String Entrada;
    private String Saida;

    public String getNome() {
        return Nome;
    }
    public void setNome(String Nome) {
        this.Nome = Nome;
    }
    public String getSaida() {
        return Saida;
    }
    public void setSaida(String Saida) {
        this.Saida = Saida;
    }
    public String getEntrada() {
        return Entrada;
    }
    public void setEntrada(String Entrada) {
        this.Entrada = Entrada;
    }
    public String getFim() {
        return Fim;
    }
    public void setFim(String Fim) {
        this.Fim = Fim;
    }
    public String getInicio() {
        return Inicio;
    }
    public void setInicio(String Inicio) {
        this.Inicio = Inicio;
    }
    public String getLocal() {
        return Local;
    }
    public void setLocal(String Local) {
        this.Local = Local;
    }
   
    
    
    
    
}
