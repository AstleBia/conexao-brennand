// ...existing code...
const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  cpf: '',
  receiveUpdates: false
});

// ...existing code...

return (
  <form onSubmit={handleSubmit}>
    {/* ...existing code... */}

    <div className="form-group checkbox-group">
      <label>
        <input
          type="checkbox"
          name="receiveUpdates"
          checked={formData.receiveUpdates}
          onChange={(e) => setFormData({ ...formData, receiveUpdates: e.target.checked })}
        />
        <span>Aceito receber no meu email atualizações e novidades do Parque de Brennand</span>
      </label>
    </div>

    {/* ...existing code... */}
  </form>
);

