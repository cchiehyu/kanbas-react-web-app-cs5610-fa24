export default function CourseStatus() {
  return (
    <div id="wd-course-status">
      <h2>Course Status</h2>

      {/* Publish/Unpublish buttons */}
      <div style={{ marginBottom: "10px" }}>
        <button>Unpublish</button> <button>Publish</button>
      </div>

      {/* Additional action buttons */}
      <div style={{ marginBottom: "10px" }}>
        <button>Import Existing Content</button>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <button>Import from Commons</button>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <button>Choose Home Page</button>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <button>View Course Stream</button>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <button>New Announcement</button>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <button>New Analytics</button>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <button>View Course Notifications</button>
      </div>
    </div>
  );
}
