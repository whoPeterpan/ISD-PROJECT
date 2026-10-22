import React, { useState } from 'react';

const emptyRecord = {
  title: '',
  type: 'Publication',
  venue: '',
  year: '',
  reference: '',
};

export default function ResearchForm() {
  const [record, setRecord] = useState(emptyRecord);
  const [records, setRecords] = useState([]);

  function handleChange(event) {
    const { name, value } = event.target;
    setRecord((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Keep research records in memory until persistent storage is added.
    setRecords((current) => [
      ...current,
      { ...record, id: `${Date.now()}-${current.length}` },
    ]);
    setRecord(emptyRecord);
  }

  return (
    <section className="form-card">
      <div className="form-heading">
        <div>
          <h2>Research records</h2>
          <p>Record publications and research projects for your appraisal.</p>
        </div>
        <span className="coming-soon">{records.length} RECORDS</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <label className="form-field full-width">
            Research title
            <input
              name="title"
              value={record.title}
              onChange={handleChange}
              placeholder="Enter publication or project title"
              required
            />
          </label>

          <label className="form-field">
            Research type
            <select name="type" value={record.type} onChange={handleChange}>
              <option>Publication</option>
              <option>Research Project</option>
              <option>Book</option>
              <option>Book Chapter</option>
              <option>Patent</option>
            </select>
          </label>

          <label className="form-field">
            Journal, publisher, or organization
            <input
              name="venue"
              value={record.venue}
              onChange={handleChange}
              placeholder="Enter publication venue"
              required
            />
          </label>

          <label className="form-field">
            Year
            <input
              type="number"
              name="year"
              min="1900"
              max="2100"
              value={record.year}
              onChange={handleChange}
              placeholder="e.g. 2026"
              required
            />
          </label>

          <label className="form-field">
            DOI or reference link (optional)
            <input
              name="reference"
              value={record.reference}
              onChange={handleChange}
              placeholder="DOI or URL"
            />
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="primary-button">
            Add research record
          </button>
        </div>
      </form>

      <div className="record-list">
        <h3>Research portfolio</h3>

        {records.length === 0 ? (
          <p className="record-empty">Your research records will appear here.</p>
        ) : (
          records.map((item) => (
            <article className="record-row" key={item.id}>
              <div>
                <strong>{item.title}</strong>
                <p>{item.type} · {item.venue} · {item.year}</p>
                {item.reference && (
                  <p className="research-reference">{item.reference}</p>
                )}
              </div>
              <span className="record-count">{item.type}</span>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
