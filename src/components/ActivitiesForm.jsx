import React, { useState } from 'react';

const emptyRecord = {
  title: '',
  type: 'Seminar',
  organizer: '',
  date: '',
  role: 'Participant',
};

export default function ActivitiesForm() {
  const [record, setRecord] = useState(emptyRecord);
  const [records, setRecords] = useState([]);

  function handleChange(event) {
    const { name, value } = event.target;
    setRecord((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Keep entries in memory until persistent storage is implemented.
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
          <h2>Academic activities</h2>
          <p>Record your participation in academic and professional events.</p>
        </div>
        <span className="coming-soon">{records.length} RECORDS</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <label className="form-field full-width">
            Activity title
            <input
              name="title"
              value={record.title}
              onChange={handleChange}
              placeholder="e.g. National Conference on AI"
              required
            />
          </label>

          <label className="form-field">
            Activity type
            <select name="type" value={record.type} onChange={handleChange}>
              <option>Seminar</option>
              <option>Conference</option>
              <option>Workshop</option>
              <option>Faculty Development Programme</option>
              <option>Guest Lecture</option>
              <option>Other</option>
            </select>
          </label>

          <label className="form-field">
            Organizer
            <input
              name="organizer"
              value={record.organizer}
              onChange={handleChange}
              placeholder="Institution or organization"
              required
            />
          </label>

          <label className="form-field">
            Activity date
            <input
              type="date"
              name="date"
              value={record.date}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-field">
            Your role
            <select name="role" value={record.role} onChange={handleChange}>
              <option>Participant</option>
              <option>Organizer</option>
              <option>Speaker</option>
              <option>Presenter</option>
              <option>Coordinator</option>
            </select>
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="primary-button">
            Add activity
          </button>
        </div>
      </form>

      <div className="record-list">
        <h3>Activity history</h3>

        {records.length === 0 ? (
          <p className="record-empty">Your academic activities will appear here.</p>
        ) : (
          records.map((item) => (
            <article className="record-row" key={item.id}>
              <div>
                <strong>{item.title}</strong>
                <p>{item.type} · {item.organizer} · {item.date}</p>
              </div>
              <span className="record-count">{item.role}</span>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
