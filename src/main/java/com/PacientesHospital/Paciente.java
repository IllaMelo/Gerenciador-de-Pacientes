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
    private String nome;
    private String local;
    private String inicio;
    private String fim;
    private String entrada;
    private String saida;

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getSaida() {
        return saida;
    }
    public void setSaida(String saida) {
        this.saida = saida;
    }
    public String getEntrada() {
        return entrada;
    }
    public void setEntrada(String entrada) {
        this.entrada = entrada;
    }
    public String getFim() {
        return fim;
    }
    public void setFim(String fim) {
        this.fim = fim;
    }
    public String getInicio() {
        return inicio;
    }
    public void setInicio(String inicio) {
        this.inicio = inicio;
    }
    public String getLocal() {
        return local;
    }
    public void setLocal(String local) {
        this.local = local;
    }
   
    
    
    
    
}
