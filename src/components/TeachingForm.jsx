import React, { useState } from 'react';

const emptyRecord = {
  courseName: '',
  courseCode: '',
  academicYear: '',
  semester: '1',
  lectures: '',
};

export default function TeachingForm() {
  const [record, setRecord] = useState(emptyRecord);
  const [records, setRecords] = useState([]);

  function handleChange(event) {
    const { name, value } = event.target;
    setRecord((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Keep added records in React state until persistent storage is implemented.
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
          <h2>Teaching records</h2>
          <p>Add courses and teaching workload for your academic appraisal.</p>
        </div>
        <span className="coming-soon">{records.length} RECORDS</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <label className="form-field">
            Course name
            <input
              name="courseName"
              value={record.courseName}
              onChange={handleChange}
              placeholder="e.g. Database Management Systems"
              required
            />
          </label>

          <label className="form-field">
            Course code
            <input
              name="courseCode"
              value={record.courseCode}
              onChange={handleChange}
              placeholder="e.g. CS301"
              required
            />
          </label>

          <label className="form-field">
            Academic year
            <input
              name="academicYear"
              value={record.academicYear}
              onChange={handleChange}
              placeholder="e.g. 2026–2027"
              required
            />
          </label>

          <label className="form-field">
            Semester
            <select
              name="semester"
              value={record.semester}
              onChange={handleChange}
            >
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              <option value="3">Semester 3</option>
              <option value="4">Semester 4</option>
              <option value="5">Semester 5</option>
              <option value="6">Semester 6</option>
              <option value="7">Semester 7</option>
              <option value="8">Semester 8</option>
            </select>
          </label>

          <label className="form-field">
            Number of lectures
            <input
              type="number"
              name="lectures"
              min="0"
              step="1"
              value={record.lectures}
              onChange={handleChange}
              placeholder="e.g. 42"
              required
            />
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="primary-button">
            Add teaching record
          </button>
        </div>
      </form>

      <div className="record-list">
        <h3>Added courses</h3>

        {records.length === 0 ? (
          <p className="record-empty">Your teaching records will appear here.</p>
        ) : (
          records.map((item) => (
            <article className="record-row" key={item.id}>
  <div>
    <strong>{item.courseName}</strong>
    <p>
      {item.courseCode} · {item.academicYear} · Semester {item.semester}
    </p>
  </div>

  <div className="record-actions">
    <span className="record-count">{item.lectures} lectures</span>
    <button
      type="button"
      className="delete-button"
      onClick={() => {
        setRecords((current) =>
          current.filter((record) => record.id !== item.id)
        );
      }}
      aria-label={`Delete ${item.courseName}`}
    >
      Delete
    </button>
  </div>
</article>
          ))
        )}
      </div>
    </section>
  );
}
