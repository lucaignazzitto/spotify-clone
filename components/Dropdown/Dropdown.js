import Dropdown from 'react-bootstrap/Dropdown';

export default function Options({ show = false, icon, label, options = [] }) {

  const handleItemClick = (opt) => {
    if (opt && opt.onClick) {
      return opt.onClick()
    } else {
      return false
    }
  }
  return (
    <Dropdown>
      <Dropdown.Toggle>
        <span className='mr-2'>{label}</span>
        {icon}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {
          options.map((opt, index) => (
            <Dropdown.Item key={index} onClick={() => handleItemClick(opt)} className={opt.className || ''}>
              <div>
              <span>{opt.icon}</span>
              {opt.label}
              </div>
            </Dropdown.Item>
          ))
        }
      </Dropdown.Menu>
    </Dropdown>
  );
}
