import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  PenTool,
  Search,
  ClipboardCheck,
  LayoutList,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Monitor,
  Smartphone,
  Grid,
  PlusCircle,
  CheckSquare,
  XCircle,
  Eye,
  Truck,
  FileText,
  RefreshCw,
} from 'lucide-react';

// --- URL GOOGLE APPS SCRIPT WEB APP UMUM ---
const GSHEET_API_URL =
  'https://script.google.com/macros/s/AKfycbzVIusN_om-Ok1c924XULShYKVf2Iz8UxtuCUTHoVqw7FM7wZGFiT_K1GS6Q9Vr0NQ0KQ/exec';

// --- URL GOOGLE APPS SCRIPT KHUSUS PEMINJAMAN TOOLS ---
const GSHEET_PEMINJAMAN_URL =
  'https://script.google.com/macros/s/AKfycbx76GObUcq5stSFuFkTGOJzY4D6T_qvWxKWmnrjzCOzgilGaphWEL2GIsC7PdPyZjXY/exec';

// --- URL GOOGLE APPS SCRIPT KHUSUS TANYA STOK (SCALSITE) ---
const GSHEET_STOK_URL =
  'https://script.google.com/macros/s/AKfycbz8HlVIxFqKpCuNVHoKaaCSx1IU1cNQDLRSfF9wJYYAZZiKa24QqZsqzh4Mo-WHotxG/exec';

// --- URL GOOGLE APPS SCRIPT KHUSUS PO (OUTSTANDING & PENERIMAAN) ---
const GSHEET_PO_URL =
  'https://script.google.com/macros/s/AKfycbwKjqEMhAfvQEp-Xzpi_zIfWf0s7KadDrWsKLhASrc0kEsooCYZtZ_p34zLzeuEVfb4RA/exec';

// --- URL GOOGLE APPS SCRIPT KHUSUS DST (DAILY STOCKTAKING) ---
const GSHEET_DST_URL =
  'https://script.google.com/macros/s/AKfycbyGLHp59zhlMmZu-6SBA4-pu07bxc4PlSNep7o1FCHbsiq5GUkeKpTuomNJDm2taT-P/exec';

// --- KERANGKA UTAMA ---
function MainLayout({ children, layoutMode, setLayoutMode }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuList = [
    { nama: 'Dashboard', rute: '/', ikon: <LayoutDashboard size={20} /> },
    { nama: 'Pengambilan', rute: '/pencatatan', ikon: <Package size={20} /> },
    { nama: 'Peminjaman Tools', rute: '/tools', ikon: <PenTool size={20} /> },
    { nama: 'Tanya Stok', rute: '/stok', ikon: <Search size={20} /> },
    {
      nama: 'Receive & Cek PO',
      rute: '/po',
      ikon: <ClipboardCheck size={20} />,
    },
    {
      nama: 'Daily Stocktaking',
      rute: '/stocktaking',
      ikon: <LayoutList size={20} />,
    },
  ];

  const gantiLayoutNext = () => {
    if (layoutMode === 'sidebar') setLayoutMode('bottom');
    else if (layoutMode === 'bottom') setLayoutMode('kiosk');
    else setLayoutMode('sidebar');
  };

  const getNamaLayout = () => {
    if (layoutMode === 'sidebar') return 'Mode Desktop (Sidebar)';
    if (layoutMode === 'bottom') return 'Mode HP (Bottom Nav)';
    return 'Mode Tablet (Kiosk)';
  };

  return (
    <div className={`app-wrapper mode-${layoutMode}`}>
      <header className="topbar">
        <div className="topbar-left">
          <div className="logo-box">
            <Package size={24} color="#fff" />
          </div>
          <span className="brand-title">WMS KINTAP</span>
        </div>
        <button onClick={gantiLayoutNext} className="btn-toggle-layout">
          {layoutMode === 'sidebar' && <Monitor size={16} />}
          {layoutMode === 'bottom' && <Smartphone size={16} />}
          {layoutMode === 'kiosk' && <Grid size={16} />}
          <span>{getNamaLayout()}</span>
        </button>
      </header>

      <div className="main-body">
        {layoutMode === 'sidebar' && (
          <aside className="sidebar">
            <div className="sidebar-section-title">MAIN MENU</div>
            <nav className="sidebar-nav">
              {menuList.map((m, idx) => {
                const isActive = location.pathname === m.rute;
                return (
                  <button
                    key={idx}
                    className={`sidebar-link ${isActive ? 'active' : ''}`}
                    onClick={() => navigate(m.rute)}
                  >
                    {m.ikon}
                    <span>{m.nama}</span>
                  </button>
                );
              })}
            </nav>
          </aside>
        )}

        <main className="content-area">{children}</main>
      </div>

      {layoutMode === 'bottom' && (
        <nav className="bottom-nav">
          {menuList.map((m, idx) => {
            const isActive = location.pathname === m.rute;
            return (
              <button
                key={idx}
                className={`bottom-link ${isActive ? 'active' : ''}`}
                onClick={() => navigate(m.rute)}
              >
                {m.ikon}
                <span>{m.nama}</span>
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
}

// --- HALAMAN DASHBOARD UTAMA ---
function HalamanDashboard() {
  const navigate = useNavigate();
  const menuCards = [
    {
      nama: 'Pencatatan Pengambilan',
      rute: '/pencatatan',
      ikon: <Package size={32} />,
    },
    { nama: 'Peminjaman Tools', rute: '/tools', ikon: <PenTool size={32} /> },
    { nama: 'Tanya Stok', rute: '/stok', ikon: <Search size={32} /> },
    {
      nama: 'Receive & Cek PO',
      rute: '/po',
      ikon: <ClipboardCheck size={32} />,
    },
    {
      nama: 'Daily Stocktaking',
      rute: '/stocktaking',
      ikon: <LayoutList size={32} />,
    },
  ];

  return (
    <div>
      <div className="hero-banner">
        <h2>Selamat Datang, Admin</h2>
        <p>Sistem Manajemen Gudang Kintap Area</p>
      </div>
      <div className="grid-cards">
        {menuCards.map((m, idx) => (
          <div
            key={idx}
            className="dashboard-card"
            onClick={() => navigate(m.rute)}
          >
            <div className="icon-circle">{m.ikon}</div>
            <span className="card-title">{m.nama}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- MENU 1: PENCATATAN PENGAMBILAN ---
function HalamanPencatatan() {
  const navigate = useNavigate();

  const [tanggal, setTanggal] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [crew, setCrew] = useState('');
  const [namaUser, setNamaUser] = useState('');
  const [jumlahItem, setJumlahItem] = useState(1);
  const [items, setItems] = useState([{ scItem: '', description: '', qty: 1 }]);
  const [noJob, setNoJob] = useState('');
  const statusOtomatis = 'BELUM IR';

  const [masterData, setMasterData] = useState([]);
  const [isLoadingMaster, setIsLoadingMaster] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notif, setNotif] = useState({ show: false, pesan: '', tipe: '' });

  useEffect(() => {
    setIsLoadingMaster(true);
    fetch(`${GSHEET_API_URL}?action=getMasterData`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMasterData(data);
        }
        setIsLoadingMaster(false);
      })
      .catch((err) => {
        console.error('Gagal mengambil master data SC:', err);
        setIsLoadingMaster(false);
      });
  }, []);

  useEffect(() => {
    if (masterData.length > 0) {
      setItems((prevItems) =>
        prevItems.map((item) => {
          if (item.scItem && !item.description) {
            const match = masterData.find(
              (m) =>
                String(m.sc).trim().toLowerCase() ===
                String(item.scItem).trim().toLowerCase()
            );
            if (match) {
              return { ...item, description: match.desc };
            }
          }
          return item;
        })
      );
    }
  }, [masterData]);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;

    if (field === 'scItem') {
      const match = masterData.find(
        (m) =>
          String(m.sc).trim().toLowerCase() ===
          String(value).trim().toLowerCase()
      );
      updatedItems[index]['description'] = match ? match.desc : '';
    }

    setItems(updatedItems);
  };

  const handleJumlahItemChange = (e) => {
    const qty = parseInt(e.target.value);
    setJumlahItem(qty);
    const newItems = [];
    for (let i = 0; i < qty; i++) {
      newItems.push(items[i] || { scItem: '', description: '', qty: 1 });
    }
    setItems(newItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!crew || !namaUser || !noJob) {
      setNotif({
        show: true,
        pesan: 'Harap lengkapi Form Crew, Nama User, dan Nomor Job!',
        tipe: 'error',
      });
      return;
    }

    for (let i = 0; i < items.length; i++) {
      if (!items[i].scItem) {
        setNotif({
          show: true,
          pesan: `Harap isi SC Item untuk barang ke-${i + 1}!`,
          tipe: 'error',
        });
        return;
      }
    }

    setIsSubmitting(true);
    setNotif({ show: false, pesan: '', tipe: '' });

    const payload = {
      action: 'savePengambilan',
      tanggal: tanggal,
      namaUser: namaUser,
      crew: crew,
      noJob: noJob,
      status: statusOtomatis,
      items: items,
    };

    fetch(GSHEET_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsSubmitting(false);
        if (data.status === 'success') {
          setNotif({
            show: true,
            pesan: 'Pencatatan Pengambilan Berhasil Disimpan ke Google Sheets!',
            tipe: 'success',
          });
          setCrew('');
          setNamaUser('');
          setNoJob('');
          setJumlahItem(1);
          setItems([{ scItem: '', description: '', qty: 1 }]);
        } else {
          setNotif({
            show: true,
            pesan: 'Gagal menyimpan: ' + data.message,
            tipe: 'error',
          });
        }
      })
      .catch((err) => {
        setIsSubmitting(false);
        setNotif({
          show: true,
          pesan: 'Terjadi kesalahan koneksi!',
          tipe: 'error',
        });
      });
  };

  return (
    <div className="page-box">
      <div className="page-header">
        <button onClick={() => navigate(-1)} className="btn-back">
          <ArrowLeft size={18} /> Kembali
        </button>
        <h2>Pencatatan Pengambilan</h2>
      </div>

      {notif.show && (
        <div className={`notif-banner ${notif.tipe}`}>
          {notif.tipe === 'success' ? (
            <CheckCircle2 size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <span>{notif.pesan}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>Tanggal</label>
          <input
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label>Form Crew *</label>
          <select
            value={crew}
            onChange={(e) => setCrew(e.target.value)}
            className="input-field"
          >
            <option value="">-- Pilih Crew --</option>
            <option value="1.SYAH-ROMAN">1. SYAH-ROMAN</option>
            <option value="2.BAHRUL-WISNU">2. BAHRUL-WISNU</option>
            <option value="3.ERIS-SUSENO">3. ERIS-SUSENO</option>
          </select>
        </div>

        <div className="form-group">
          <label>Nama User *</label>
          <input
            type="text"
            placeholder="Masukkan nama user"
            value={namaUser}
            onChange={(e) => setNamaUser(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label>Jumlah Item</label>
          <select
            value={jumlahItem}
            onChange={handleJumlahItemChange}
            className="input-field"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} Item
              </option>
            ))}
          </select>
        </div>

        <div className="items-section">
          <h3>Detail Barang Ambil</h3>
          {items.map((item, index) => (
            <div key={index} className="item-row">
              <span className="item-badge">Item #{index + 1}</span>
              <div className="grid-2col">
                <div>
                  <label>SC Item *</label>
                  <input
                    type="text"
                    placeholder="Contoh: 6384"
                    value={item.scItem}
                    onChange={(e) =>
                      handleItemChange(index, 'scItem', e.target.value)
                    }
                    className="input-field"
                  />
                </div>
                <div>
                  <label>QTY</label>
                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        'qty',
                        parseInt(e.target.value) || 1
                      )
                    }
                    className="input-field"
                  />
                </div>
              </div>
              <div style={{ marginTop: '8px' }}>
                <label>Description (Otomatis)</label>
                <input
                  type="text"
                  placeholder={
                    isLoadingMaster
                      ? 'Sedang download Data Master...'
                      : 'Deskripsi terisi otomatis...'
                  }
                  value={item.description}
                  onChange={(e) =>
                    handleItemChange(index, 'description', e.target.value)
                  }
                  className="input-field"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="form-group">
          <label>Status</label>
          <input
            type="text"
            value={statusOtomatis}
            disabled
            className="input-field readonly"
          />
        </div>

        <div className="form-group">
          <label>Nomor Job *</label>
          <input
            type="text"
            placeholder="Masukkan nomor job"
            value={noJob}
            onChange={(e) => setNoJob(e.target.value)}
            className="input-field"
          />
        </div>

        <button type="submit" disabled={isSubmitting} className="btn-submit">
          {isSubmitting ? 'Mengirim ke Google Sheets...' : 'SUBMIT PENGAMBILAN'}
        </button>
      </form>
    </div>
  );
}

// --- MENU 2: PEMINJAMAN TOOLS (DENGAN CACHE, REFRESH, & BULK CHECKLIST) ---
function HalamanTools() {
  const navigate = useNavigate();
  const [subTab, setSubTab] = useState('dashboard');

  const [listDipinjam, setListDipinjam] = useState([]);
  const [selectedTools, setSelectedTools] = useState([]); // TAMBAHAN BULK RETURN
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);
  const [lastUpdatedTools, setLastUpdatedTools] = useState('');

  const [modalReturn, setModalReturn] = useState({
    open: false,
    items: [], // DIUBAH JADI ARRAY UNTUK BULK
    isDamaged: false,
    note: '',
  });
  const [isReturning, setIsReturning] = useState(false); // TAMBAHAN BULK RETURN
  const [notifTools, setNotifTools] = useState({
    show: false,
    pesan: '',
    tipe: '',
  });

  // Form Peminjaman Baru
  const [jumlahJenisAlat, setJumlahJenisAlat] = useState(1);
  const [namaPeminjam, setNamaPeminjam] = useState('');
  const [workArea, setWorkArea] = useState('');
  const [tglPeminjaman, setTglPeminjaman] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [warehouseman, setWarehouseman] = useState('');
  const [itemsPinjam, setItemsPinjam] = useState([
    { pencarianAlat: '', namaAlat: '', noColour: '', qty: 1 },
  ]);
  const [isSubmittingPinjam, setIsSubmittingPinjam] = useState(false);

  // Form Registrasi Tools Baru
  const [regPrefix, setRegPrefix] = useState('TLS');
  const [regToolName, setRegToolName] = useState('');
  const [regMnemonic, setRegMnemonic] = useState('');
  const [regSerialNum, setRegSerialNum] = useState('');
  const [regNote, setRegNote] = useState('');
  const [isSubmittingReg, setIsSubmittingReg] = useState(false);

  // Master Data Alat dari Tab REGISTRASI
  const [masterTools, setMasterTools] = useState([]);

  // Ambil Data Master Tools & Laporan Open dengan Cache
  const fetchDataTools = (isRefresh = false) => {
    const cachedMaster = localStorage.getItem('wms_tools_master_cache');
    const cachedOpen = localStorage.getItem('wms_tools_open_cache');
    const cachedTime = localStorage.getItem('wms_tools_time');

    if (cachedMaster && cachedOpen && !isRefresh) {
      setMasterTools(JSON.parse(cachedMaster));
      setListDipinjam(JSON.parse(cachedOpen));
      if (cachedTime) setLastUpdatedTools(cachedTime);
      setIsLoadingDashboard(false);
    } else {
      setIsLoadingDashboard(true);
      fetch(`${GSHEET_PEMINJAMAN_URL}?action=getToolsMaster`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setMasterTools(data);
            localStorage.setItem(
              'wms_tools_master_cache',
              JSON.stringify(data)
            );
          }
        })
        .catch((err) => console.error('Gagal ambil master tools:', err));

      fetch(`${GSHEET_PEMINJAMAN_URL}?action=getToolsDipinjam`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setListDipinjam(data);
            setSelectedTools([]); // Reset checkbox saat refresh
            localStorage.setItem('wms_tools_open_cache', JSON.stringify(data));
            const nowStr = new Date().toLocaleTimeString('id-ID', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            });
            localStorage.setItem('wms_tools_time', nowStr);
            setLastUpdatedTools(nowStr);
          }
          setIsLoadingDashboard(false);
        })
        .catch((err) => setIsLoadingDashboard(false));
    }
  };

  useEffect(() => {
    fetchDataTools(false);
  }, []);

  const handleRefreshTools = () => {
    fetchDataTools(true);
  };

  // --- FUNGSI CHECKLIST BULK RETURN (TAMBAHAN) ---
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedTools([...listDipinjam]);
    } else {
      setSelectedTools([]);
    }
  };

  const handleSelectTool = (item) => {
    const isSelected = selectedTools.some((t) => t.rowIndex === item.rowIndex);
    if (isSelected) {
      setSelectedTools(
        selectedTools.filter((t) => t.rowIndex !== item.rowIndex)
      );
    } else {
      setSelectedTools([...selectedTools, item]);
    }
  };
  // ----------------------------------------------

  const handleJumlahJenisAlatChange = (e) => {
    const val = parseInt(e.target.value);
    setJumlahJenisAlat(val);
    const newItems = [];
    for (let i = 0; i < val; i++) {
      newItems.push(
        itemsPinjam[i] || {
          pencarianAlat: '',
          namaAlat: '',
          noColour: '',
          qty: 1,
        }
      );
    }
    setItemsPinjam(newItems);
  };

  const handleItemPinjamChange = (index, field, value) => {
    const updated = [...itemsPinjam];
    updated[index][field] = value;
    setItemsPinjam(updated);
  };

  const handleSelectAlat = (index, tool) => {
    const updated = [...itemsPinjam];
    updated[index].namaAlat = tool.toolName;
    updated[index].noColour = tool.kodeReg;
    updated[index].pencarianAlat = `${tool.kodeReg} - ${tool.toolName}`;
    setItemsPinjam(updated);
  };

  // Submit Peminjaman Baru (Otomatis Bypass Cache & Refresh Data)
  const handleSubmitPeminjamanBaru = (e) => {
    e.preventDefault();
    if (!namaPeminjam || !workArea || !warehouseman) {
      setNotifTools({
        show: true,
        pesan: 'Harap lengkapi Nama Peminjam, Work Area, dan Warehouseman!',
        tipe: 'error',
      });
      return;
    }
    for (let i = 0; i < itemsPinjam.length; i++) {
      if (!itemsPinjam[i].namaAlat) {
        setNotifTools({
          show: true,
          pesan: `Harap pilih Alat untuk baris ke-${i + 1}!`,
          tipe: 'error',
        });
        return;
      }
    }

    setIsSubmittingPinjam(true);
    fetch(GSHEET_PEMINJAMAN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        action: 'submitPeminjaman',
        namaPeminjam,
        workArea,
        tglPeminjaman,
        warehouseman,
        items: itemsPinjam,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsSubmittingPinjam(false);
        if (data.status === 'success') {
          setNotifTools({
            show: true,
            pesan: 'Peminjaman berhasil disimpan ke Laporan!',
            tipe: 'success',
          });
          setNamaPeminjam('');
          setWorkArea('');
          setJumlahJenisAlat(1);
          setItemsPinjam([
            { pencarianAlat: '', namaAlat: '', noColour: '', qty: 1 },
          ]);
          fetchDataTools(true); // Refresh cache otomatis
        }
      })
      .catch((err) => {
        setIsSubmittingPinjam(false);
        setNotifTools({
          show: true,
          pesan: 'Gagal menyambung ke server Google Sheets.',
          tipe: 'error',
        });
      });
  };

  // Submit Registrasi Tool Baru
  const handleSubmitRegistrasi = (e) => {
    e.preventDefault();
    if (!regToolName || !regMnemonic || !regSerialNum) {
      setNotifTools({
        show: true,
        pesan: 'Harap lengkapi Tool Name, Mnemonic, dan Serial Number!',
        tipe: 'error',
      });
      return;
    }

    const kodeReg = `${regPrefix}-${Math.floor(1000 + Math.random() * 9000)}`;
    setIsSubmittingReg(true);

    fetch(GSHEET_PEMINJAMAN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        action: 'registerTool',
        kodeReg,
        toolName: regToolName,
        mnemonic: regMnemonic,
        serialNumber: regSerialNum,
        status: 'Active',
        note: regNote,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsSubmittingReg(false);
        if (data.status === 'success') {
          setNotifTools({
            show: true,
            pesan: `Tool baru berhasil didaftarkan dengan Kode: ${kodeReg}`,
            tipe: 'success',
          });
          setRegToolName('');
          setRegMnemonic('');
          setRegSerialNum('');
          setRegNote('');
          fetchDataTools(true); // Refresh cache otomatis
        }
      })
      .catch((err) => {
        setIsSubmittingReg(false);
        setNotifTools({
          show: true,
          pesan: 'Gagal mendaftarkan tools baru.',
          tipe: 'error',
        });
      });
  };

  // Konfirmasi Pengembalian (Otomatis Refresh Data setelah Close) - DIUBAH UNTUK BULK
  const handleConfirmReturn = async (isAman) => {
    const tglKembali = new Date().toISOString().split('T')[0];
    const note = isAman ? 'Aman' : modalReturn.note;

    setIsReturning(true);
    let successCount = 0;

    // Loop berurutan agar Google Sheets tidak tertimpa concurrent requests
    for (const item of modalReturn.items) {
      try {
        const res = await fetch(GSHEET_PEMINJAMAN_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            action: 'returnTool',
            rowIndex: item.rowIndex,
            tglKembali,
            note,
          }),
        });
        const data = await res.json();
        if (data.status === 'success') successCount++;
      } catch (err) {
        console.error('Gagal update status item:', item.namaAlat, err);
      }
    }

    setIsReturning(false);

    if (successCount === modalReturn.items.length) {
      setNotifTools({
        show: true,
        pesan: `${successCount} Tool berhasil dikembalikan (Status: CLOSE).`,
        tipe: 'success',
      });
    } else {
      setNotifTools({
        show: true,
        pesan: `Hanya ${successCount} dari ${modalReturn.items.length} yang berhasil dikembalikan.`,
        tipe: 'warning',
      });
    }

    setModalReturn({
      open: false,
      items: [],
      isDamaged: false,
      note: '',
    });
    setSelectedTools([]); // Reset checkbox
    fetchDataTools(true); // Refresh cache otomatis
  };

  return (
    <div className="page-box">
      <div
        className="page-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={() => navigate(-1)} className="btn-back">
            <ArrowLeft size={18} /> Kembali
          </button>
          <h2>Peminjaman Tools</h2>
        </div>
        <button
          onClick={handleRefreshTools}
          className="btn-back"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: '#00897B',
            color: '#fff',
            border: 'none',
          }}
          title="Perbarui Data Tools dari Google Sheets"
        >
          <RefreshCw
            size={16}
            className={isLoadingDashboard ? 'fa-spin' : ''}
          />
          {isLoadingDashboard ? 'Memuat...' : 'Refresh Data'}
        </button>
      </div>

      {lastUpdatedTools && !isLoadingDashboard && (
        <div
          style={{
            fontSize: '12px',
            color: '#666',
            marginBottom: '10px',
            textAlign: 'right',
          }}
        >
          Data Tools terakhir dimuat pukul: <strong>{lastUpdatedTools}</strong>
        </div>
      )}

      <div className="sub-tab-container">
        <button
          className={`sub-tab-btn ${subTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setSubTab('dashboard')}
        >
          <CheckSquare size={16} /> Dashboard Open ({listDipinjam.length})
        </button>
        <button
          className={`sub-tab-btn ${
            subTab === 'peminjaman_baru' ? 'active' : ''
          }`}
          onClick={() => setSubTab('peminjaman_baru')}
        >
          <PlusCircle size={16} /> Peminjaman Baru
        </button>
        <button
          className={`sub-tab-btn ${subTab === 'registrasi' ? 'active' : ''}`}
          onClick={() => setSubTab('registrasi')}
        >
          <PlusCircle size={16} /> Registrasi Tools Baru
        </button>
      </div>

      {notifTools.show && (
        <div className={`notif-banner ${notifTools.tipe}`}>
          <span>{notifTools.pesan}</span>
        </div>
      )}

      {/* DASHBOARD OPEN */}
      {subTab === 'dashboard' && (
        <div>
          {/* TAMPILAN TOMBOL BULK RETURN (TAMBAHAN) */}
          {selectedTools.length > 0 && (
            <div
              style={{
                background: '#e0f2f1',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '15px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ color: '#00695c', fontWeight: 'bold' }}>
                {selectedTools.length} Item Terpilih
              </span>
              <button
                onClick={() =>
                  setModalReturn({
                    open: true,
                    items: selectedTools,
                    isDamaged: false,
                    note: '',
                  })
                }
                className="btn-submit"
                style={{
                  marginTop: 0,
                  padding: '8px 16px',
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                }}
              >
                <CheckSquare size={16} /> Kembalikan {selectedTools.length}{' '}
                Terpilih
              </button>
            </div>
          )}

          {isLoadingDashboard && listDipinjam.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '20px' }}>
              Memuat data dari Google Sheets...
            </p>
          ) : listDipinjam.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '30px', color: '#777' }}>
              Tidak ada tools yang berstatus OPEN saat ini.
            </p>
          ) : (
            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    {/* CHECKBOX PILIH SEMUA (TAMBAHAN) */}
                    <th style={{ width: '40px', textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={
                          selectedTools.length === listDipinjam.length &&
                          listDipinjam.length > 0
                        }
                      />
                    </th>
                    <th>Peminjam</th>
                    <th>Nama Alat</th>
                    <th>No / Colour (Kode)</th>
                    <th>Work Area</th>
                    <th style={{ textAlign: 'center' }}>QTY</th>
                    <th>Warehouseman</th>
                    <th style={{ textAlign: 'right' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {listDipinjam.map((item, idx) => (
                    <tr
                      key={idx}
                      className={
                        selectedTools.some((t) => t.rowIndex === item.rowIndex)
                          ? 'row-selected'
                          : ''
                      }
                    >
                      {/* CHECKBOX PER BARIS (TAMBAHAN) */}
                      <td style={{ textAlign: 'center' }}>
                        <input
                          type="checkbox"
                          checked={selectedTools.some(
                            (t) => t.rowIndex === item.rowIndex
                          )}
                          onChange={() => handleSelectTool(item)}
                        />
                      </td>
                      <td>
                        <strong>{item.namaPeminjam}</strong>
                      </td>
                      <td>{item.namaAlat}</td>
                      <td>
                        <span style={{ color: '#00897B', fontWeight: 'bold' }}>
                          {item.noColour}
                        </span>
                      </td>
                      <td>{item.workArea}</td>
                      <td style={{ textAlign: 'center' }}>
                        <span className="qty-badge">{item.qty}</span>
                      </td>
                      <td>{item.warehouseman}</td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          onClick={() =>
                            setModalReturn({
                              open: true,
                              items: [item], // DIUBAH JADI ARRAY
                              isDamaged: false,
                              note: '',
                            })
                          }
                          className="btn-return"
                        >
                          Kembali
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* PEMINJAMAN BARU */}
      {subTab === 'peminjaman_baru' && (
        <form onSubmit={handleSubmitPeminjamanBaru} className="form-container">
          <div className="form-group">
            <label>Jumlah Jenis Alat</label>
            <select
              value={jumlahJenisAlat}
              onChange={handleJumlahJenisAlatChange}
              className="input-field"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} Jenis Alat
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Nama Peminjam *</label>
            <input
              type="text"
              placeholder="Nama peminjam..."
              value={namaPeminjam}
              onChange={(e) => setNamaPeminjam(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>Work Area *</label>
            <input
              type="text"
              placeholder="Contoh: Pit A / Workshop..."
              value={workArea}
              onChange={(e) => setWorkArea(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>Tanggal Peminjaman</label>
            <input
              type="date"
              value={tglPeminjaman}
              onChange={(e) => setTglPeminjaman(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="items-section">
            <h3>Daftar Alat Dipinjam</h3>
            {itemsPinjam.map((item, index) => {
              const filtered = masterTools.filter(
                (m) =>
                  item.pencarianAlat &&
                  (m.toolName
                    .toLowerCase()
                    .includes(item.pencarianAlat.toLowerCase()) ||
                    m.kodeReg
                      .toLowerCase()
                      .includes(item.pencarianAlat.toLowerCase()))
              );
              return (
                <div
                  key={index}
                  className="item-row"
                  style={{
                    background: '#fafafa',
                    padding: '12px',
                    borderRadius: '8px',
                    marginBottom: '12px',
                    position: 'relative',
                  }}
                >
                  <span
                    className="item-badge"
                    style={{ marginBottom: '8px', display: 'inline-block' }}
                  >
                    Alat #{index + 1}
                  </span>
                  <div className="form-group">
                    <label>Pencarian Nama Alat / Kode *</label>
                    <input
                      type="text"
                      placeholder="Ketik nama atau kode reg alat..."
                      value={item.pencarianAlat}
                      onChange={(e) =>
                        handleItemPinjamChange(
                          index,
                          'pencarianAlat',
                          e.target.value
                        )
                      }
                      className="input-field"
                    />
                    {filtered.length > 0 &&
                      item.pencarianAlat !== item.namaAlat && (
                        <div
                          style={{
                            position: 'absolute',
                            background: '#fff',
                            border: '1px solid #ccc',
                            width: '95%',
                            maxHeight: '140px',
                            overflowY: 'auto',
                            zIndex: 10,
                            borderRadius: '4px',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                          }}
                        >
                          {filtered.map((t, tIdx) => (
                            <div
                              key={tIdx}
                              onClick={() => handleSelectAlat(index, t)}
                              style={{
                                padding: '8px 12px',
                                cursor: 'pointer',
                                borderBottom: '1px solid #eee',
                                fontSize: '14px',
                              }}
                            >
                              <strong>{t.kodeReg}</strong> - {t.toolName} (
                              {t.mnemonic})
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                  <div className="grid-2col">
                    <div>
                      <label>Nama Alat (Otomatis)</label>
                      <input
                        type="text"
                        value={item.namaAlat}
                        readOnly
                        className="input-field readonly"
                        style={{ background: '#f5f5f5' }}
                      />
                    </div>
                    <div>
                      <label>QTY *</label>
                      <input
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) =>
                          handleItemPinjamChange(
                            index,
                            'qty',
                            parseInt(e.target.value) || 1
                          )
                        }
                        className="input-field"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="form-group" style={{ marginTop: '15px' }}>
            <label>Warehouseman *</label>
            <select
              value={warehouseman}
              onChange={(e) => setWarehouseman(e.target.value)}
              className="input-field"
            >
              <option value="">-- Pilih Warehouseman --</option>
              <option value="ARI">ARI</option>
              <option value="SYAM">SYAM</option>
              <option value="UPHIK">UPHIK</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmittingPinjam}
            className="btn-submit"
          >
            {isSubmittingPinjam ? 'Menyimpan...' : 'SUBMIT PEMINJAMAN BARU'}
          </button>
        </form>
      )}

      {/* REGISTRASI TOOLS BARU */}
      {subTab === 'registrasi' && (
        <form onSubmit={handleSubmitRegistrasi} className="form-container">
          <div className="form-group">
            <label>Awalan Registration Number *</label>
            <select
              value={regPrefix}
              onChange={(e) => setRegPrefix(e.target.value)}
              className="input-field"
            >
              <option value="TLS">TLS (Inisial Tools)</option>
              <option value="KTP">KTP (Sesuai KTP)</option>
              <option value="KNT">KNT (Kintap Area)</option>
            </select>
          </div>
          <div className="form-group">
            <label>Tool Name *</label>
            <input
              type="text"
              placeholder="Contoh: Digital Torque Wrench"
              value={regToolName}
              onChange={(e) => setRegToolName(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>Mnemonic *</label>
            <input
              type="text"
              placeholder="Contoh: DTW-01"
              value={regMnemonic}
              onChange={(e) => setRegMnemonic(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>Serial Number *</label>
            <input
              type="text"
              placeholder="Contoh: SN-88392019"
              value={regSerialNum}
              onChange={(e) => setRegSerialNum(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>Note / Catatan</label>
            <textarea
              placeholder="Catatan kondisi..."
              value={regNote}
              onChange={(e) => setRegNote(e.target.value)}
              className="input-field"
              rows="3"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmittingReg}
            className="btn-submit"
          >
            {isSubmittingReg ? 'Mendaftarkan...' : 'REGISTER TOOLS BARU'}
          </button>
        </form>
      )}

      {/* MODAL PENGEMBALIAN */}
      {modalReturn.open && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Pengembalian Tools</h3>
            <p>
              Tools:{' '}
              <strong>
                {modalReturn.items.length === 1
                  ? modalReturn.items[0].namaAlat
                  : `${modalReturn.items.length} Item Terpilih`}
              </strong>
              {modalReturn.items.length === 1 &&
                ` (${modalReturn.items[0].namaPeminjam})`}
            </p>
            {isReturning ? (
              <p
                style={{
                  textAlign: 'center',
                  padding: '20px',
                  color: '#00897B',
                  fontWeight: 'bold',
                }}
              >
                Sedang Memproses Pengembalian...
              </p>
            ) : !modalReturn.isDamaged ? (
              <div>
                <p style={{ margin: '20px 0', fontSize: '15px' }}>
                  Apakah tools kembali dengan aman?
                </p>
                <div
                  style={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'flex-end',
                  }}
                >
                  <button
                    onClick={() =>
                      setModalReturn({ ...modalReturn, isDamaged: true })
                    }
                    className="btn-modal-no"
                  >
                    <XCircle size={16} /> TIDAK (Rusak)
                  </button>
                  <button
                    onClick={() => handleConfirmReturn(true)}
                    className="btn-modal-yes"
                  >
                    <CheckCircle2 size={16} /> YA (Aman)
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="form-group" style={{ margin: '15px 0' }}>
                  <label style={{ color: '#c62828' }}>
                    Catatan Kerusakan *
                  </label>
                  <textarea
                    placeholder="Jelaskan kerusakan..."
                    value={modalReturn.note}
                    onChange={(e) =>
                      setModalReturn({ ...modalReturn, note: e.target.value })
                    }
                    className="input-field"
                    rows="3"
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'flex-end',
                  }}
                >
                  <button
                    onClick={() =>
                      setModalReturn({
                        open: false,
                        items: [],
                        isDamaged: false,
                        note: '',
                      })
                    }
                    className="btn-back"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => handleConfirmReturn(false)}
                    className="btn-submit"
                    style={{ marginTop: 0, padding: '8px 16px' }}
                  >
                    SUBMIT & CLOSE
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// --- MENU 3: TANYA STOK (DENGAN CACHE & TOMBOL REFRESH) ---
function HalamanStok() {
  const navigate = useNavigate();
  const [searchSC, setSearchSC] = useState('');
  const [searchDesc, setSearchDesc] = useState('');
  const [selectedStock, setSelectedStock] = useState(null);

  const [dataStok, setDataStok] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('');

  const loadStokData = (isRefresh = false) => {
    const cachedData = localStorage.getItem('wms_scalsite_cache');
    const cachedTime = localStorage.getItem('wms_scalsite_time');

    if (cachedData && !isRefresh) {
      setDataStok(JSON.parse(cachedData));
      if (cachedTime) setLastUpdated(cachedTime);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      fetch(`${GSHEET_STOK_URL}?action=getStokData`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setDataStok(data);
            localStorage.setItem('wms_scalsite_cache', JSON.stringify(data));
            const nowStr = new Date().toLocaleTimeString('id-ID', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            });
            localStorage.setItem('wms_scalsite_time', nowStr);
            setLastUpdated(nowStr);
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.error('Gagal memuat data stok dari SCALSITE:', err);
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    loadStokData(false);
  }, []);

  const handleRefresh = () => {
    loadStokData(true);
  };

  const hasilFilter = dataStok.filter((item) => {
    const matchSC =
      searchSC.trim() === '' ||
      item.sc.toLowerCase().includes(searchSC.toLowerCase());
    const matchDesc =
      searchDesc.trim() === '' ||
      item.desc.toLowerCase().includes(searchDesc.toLowerCase());
    return matchSC && matchDesc;
  });

  return (
    <div className="page-box">
      <div
        className="page-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={() => navigate(-1)} className="btn-back">
            <ArrowLeft size={18} /> Kembali
          </button>
          <h2>Tanya Stok Item (SCALSITE)</h2>
        </div>
        <button
          onClick={handleRefresh}
          className="btn-back"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: '#00897B',
            color: '#fff',
            border: 'none',
          }}
          title="Perbarui Data dari Google Sheets"
        >
          <RefreshCw size={16} className={isLoading ? 'fa-spin' : ''} />
          {isLoading ? 'Memuat...' : 'Refresh Data'}
        </button>
      </div>

      {lastUpdated && !isLoading && (
        <div
          style={{
            fontSize: '12px',
            color: '#666',
            marginBottom: '10px',
            textAlign: 'right',
          }}
        >
          Data terakhir dimuat dari Cache / Server pukul:{' '}
          <strong>{lastUpdated}</strong>
        </div>
      )}

      <div className="grid-2col" style={{ marginBottom: '20px' }}>
        <div className="form-group">
          <label>Cek Berdasarkan Stockcode</label>
          <input
            type="text"
            placeholder="Ketik Kode SC..."
            value={searchSC}
            onChange={(e) => setSearchSC(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Cek Berdasarkan Deskripsi</label>
          <input
            type="text"
            placeholder="Ketik Nama Barang..."
            value={searchDesc}
            onChange={(e) => setSearchDesc(e.target.value)}
            className="input-field"
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Stockcode (SC)</th>
              <th>Deskripsi Barang</th>
              <th>Warehouse</th>
              <th style={{ textAlign: 'center' }}>Detail</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && dataStok.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    textAlign: 'center',
                    padding: '20px',
                    color: '#888',
                  }}
                >
                  Memuat data stok dari Google Sheets (SCALSITE)...
                </td>
              </tr>
            ) : hasilFilter.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    textAlign: 'center',
                    padding: '20px',
                    color: '#888',
                  }}
                >
                  Tidak ada barang yang cocok dengan pencarian Anda.
                </td>
              </tr>
            ) : (
              hasilFilter.map((item, index) => (
                <tr
                  key={index}
                  onClick={() => setSelectedStock(item)}
                  style={{ cursor: 'pointer' }}
                  className="row-hover-stok"
                >
                  <td>
                    <strong style={{ color: '#00897B' }}>{item.sc}</strong>
                  </td>
                  <td>{item.desc}</td>
                  <td>{item.warehouse}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      className="btn-return"
                      style={{ backgroundColor: '#00897B' }}
                    >
                      <Eye
                        size={14}
                        style={{ marginRight: '4px', verticalAlign: 'middle' }}
                      />{' '}
                      lihat
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedStock && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3
              style={{
                borderBottom: '2px solid #00897B',
                paddingBottom: '8px',
              }}
            >
              Detail Stok Barang
            </h3>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                margin: '15px 0',
              }}
            >
              <div>
                <span
                  style={{ fontSize: '12px', color: '#777', display: 'block' }}
                >
                  STOCKCODE (SC)
                </span>
                <strong style={{ fontSize: '16px', color: '#00897B' }}>
                  {selectedStock.sc}
                </strong>
              </div>

              <div>
                <span
                  style={{ fontSize: '12px', color: '#777', display: 'block' }}
                >
                  DESKRIPSI BARANG
                </span>
                <span style={{ fontWeight: 'bold' }}>{selectedStock.desc}</span>
              </div>

              <div>
                <span
                  style={{ fontSize: '12px', color: '#777', display: 'block' }}
                >
                  LOKASI WAREHOUSE
                </span>
                <span>{selectedStock.warehouse}</span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px',
                  background: '#f5f5f5',
                  padding: '10px',
                  borderRadius: '8px',
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: '12px',
                      color: '#777',
                      display: 'block',
                    }}
                  >
                    HARGA
                  </span>
                  <strong style={{ color: '#2e7d32' }}>
                    {selectedStock.price.toLocaleString('id-ID')}
                  </strong>
                </div>
                <div>
                  <span
                    style={{
                      fontSize: '12px',
                      color: '#777',
                      display: 'block',
                    }}
                  >
                    SOH (QTY SYSTEM)
                  </span>
                  <strong style={{ color: '#FF8F00', fontSize: '16px' }}>
                    {selectedStock.qty} Pcs
                  </strong>
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '20px',
              }}
            >
              <button
                onClick={() => setSelectedStock(null)}
                className="btn-submit"
                style={{ marginTop: 0, padding: '8px 20px' }}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- MENU 4: RECEIVE DAN CEK PO (TERHUBUNG KE GSHEET_PO_URL) ---
function HalamanPO() {
  const navigate = useNavigate();
  const [subTab, setSubTab] = useState('penerimaan');

  const [tglTerima, setTglTerima] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [noDO, setNoDO] = useState('');
  const [noPOInput, setNoPOInput] = useState('');
  const [noPOSelect, setNoPOSelect] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notifPO, setNotifPO] = useState({ show: false, pesan: '', tipe: '' });

  // Data Outstanding dari Google Sheets PO URL
  const [outstandingData, setOutstandingData] = useState([]);
  const [isLoadingOutstanding, setIsLoadingOutstanding] = useState(false);
  const [poItemsState, setPoItemsState] = useState([]);

  // Data History Penerimaan untuk Cek PO
  const [historyPO, setHistoryPO] = useState([]);
  const [searchCekPO, setSearchCekPO] = useState('');
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  // Ambil data Outstanding PO & History Penerimaan
  useEffect(() => {
    setIsLoadingOutstanding(true);
    fetch(`${GSHEET_PO_URL}?action=getOutstandingPO`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setOutstandingData(data);
        }
        setIsLoadingOutstanding(false);
      })
      .catch((err) => {
        console.error('Gagal mengambil data outstanding:', err);
        setIsLoadingOutstanding(false);
      });

    setIsLoadingHistory(true);
    fetch(`${GSHEET_PO_URL}?action=getPenerimaanHistory`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setHistoryPO(data);
        }
        setIsLoadingHistory(false);
      })
      .catch((err) => setIsLoadingHistory(false));
  }, []);

  // Daftar Unique Nomor PO untuk Search Autocomplete
  const listUniquePO = [...new Set(outstandingData.map((item) => item.poNo))];
  const filteredPOList = listUniquePO.filter((po) =>
    po.toLowerCase().includes(noPOInput.toLowerCase())
  );

  const currentPOItems = outstandingData.filter(
    (item) => item.poNo === noPOSelect
  );
  const currentSupplier =
    currentPOItems.length > 0
      ? `${currentPOItems[0].supplierNo} - ${currentPOItems[0].supplierName}`
      : '-';

  const handleSelectPO = (poNum) => {
    setNoPOSelect(poNum);
    setNoPOInput(poNum);
    const items = outstandingData
      .filter((item) => item.poNo === poNum)
      .map((item) => ({
        ...item,
        checked: true,
        qtyDiterima:
          item.qtyOutstanding > 0 ? item.qtyOutstanding : item.qtyOrder,
      }));
    setPoItemsState(items);
  };

  const handleItemPOChange = (index, field, value) => {
    const updated = [...poItemsState];
    updated[index][field] = value;
    setPoItemsState(updated);
  };

  const handleSubmitPenerimaan = (e) => {
    e.preventDefault();
    if (!noDO || !noPOSelect) {
      setNotifPO({
        show: true,
        pesan: 'Harap lengkapi No DO dan Nomor PO!',
        tipe: 'error',
      });
      return;
    }

    const itemsToSubmit = poItemsState.filter((i) => i.checked);
    if (itemsToSubmit.length === 0) {
      setNotifPO({
        show: true,
        pesan: 'Pilih minimal 1 item yang akan diterima!',
        tipe: 'error',
      });
      return;
    }

    setIsSubmitting(true);
    setNotifPO({ show: false, pesan: '', tipe: '' });

    const payload = {
      action: 'savePenerimaanPO',
      tanggal: tglTerima,
      noDO: noDO,
      supplier: currentSupplier,
      items: itemsToSubmit,
    };

    fetch(GSHEET_PO_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsSubmitting(false);
        if (data.status === 'success') {
          setNotifPO({
            show: true,
            pesan: `Penerimaan Barang untuk PO ${noPOSelect} Berhasil Disimpan!`,
            tipe: 'success',
          });
          setNoDO('');
          setNoPOInput('');
          setNoPOSelect('');
          setPoItemsState([]);
          // Refresh history
          fetch(`${GSHEET_PO_URL}?action=getPenerimaanHistory`)
            .then((res) => res.json())
            .then((hData) => {
              if (Array.isArray(hData)) setHistoryPO(hData);
            });
        } else {
          setNotifPO({
            show: true,
            pesan: 'Gagal menyimpan penerimaan.',
            tipe: 'error',
          });
        }
      })
      .catch((err) => {
        setIsSubmitting(false);
        setNotifPO({
          show: true,
          pesan: 'Terjadi kesalahan koneksi.',
          tipe: 'error',
        });
      });
  };

  const hasilCekPO = historyPO.filter(
    (i) =>
      searchCekPO.trim() === '' ||
      i.poNo.toLowerCase().includes(searchCekPO.toLowerCase())
  );

  return (
    <div className="page-box">
      <div className="page-header">
        <button onClick={() => navigate(-1)} className="btn-back">
          <ArrowLeft size={18} /> Kembali
        </button>
        <h2>Receive & Cek PO</h2>
      </div>

      <div className="sub-tab-container">
        <button
          className={`sub-tab-btn ${subTab === 'penerimaan' ? 'active' : ''}`}
          onClick={() => {
            setSubTab('penerimaan');
            setNotifPO({ show: false, pesan: '', tipe: '' });
          }}
        >
          <Truck size={16} /> Penerimaan Barang
        </button>
        <button
          className={`sub-tab-btn ${subTab === 'cekpo' ? 'active' : ''}`}
          onClick={() => {
            setSubTab('cekpo');
            setNotifPO({ show: false, pesan: '', tipe: '' });
          }}
        >
          <FileText size={16} /> Cek PO
        </button>
      </div>

      {notifPO.show && (
        <div className={`notif-banner ${notifPO.tipe}`}>
          {notifPO.tipe === 'success' ? (
            <CheckCircle2 size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <span>{notifPO.pesan}</span>
        </div>
      )}

      {subTab === 'penerimaan' && (
        <form onSubmit={handleSubmitPenerimaan} className="form-container">
          <div className="grid-2col">
            <div className="form-group">
              <label>Tanggal Penerimaan</label>
              <input
                type="date"
                value={tglTerima}
                onChange={(e) => setTglTerima(e.target.value)}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>Nomor DO *</label>
              <input
                type="text"
                placeholder="Masukkan Nomor Surat Jalan/DO"
                value={noDO}
                onChange={(e) => setNoDO(e.target.value)}
                className="input-field"
              />
            </div>
          </div>

          <div className="grid-2col">
            <div className="form-group" style={{ position: 'relative' }}>
              <label>Cari & Pilih Nomor PO *</label>
              <input
                type="text"
                placeholder="Ketik nomor PO untuk mencari..."
                value={noPOInput}
                onChange={(e) => {
                  setNoPOInput(e.target.value);
                  if (noPOSelect) setNoPOSelect('');
                }}
                className="input-field"
              />
              {noPOInput && !noPOSelect && filteredPOList.length > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    background: '#fff',
                    border: '1px solid #ccc',
                    width: '100%',
                    maxHeight: '150px',
                    overflowY: 'auto',
                    zIndex: 10,
                    borderRadius: '4px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  }}
                >
                  {filteredPOList.map((po, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSelectPO(po)}
                      style={{
                        padding: '10px 12px',
                        cursor: 'pointer',
                        borderBottom: '1px solid #eee',
                        fontSize: '14px',
                      }}
                    >
                      <strong>{po}</strong>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Supplier (Otomatis)</label>
              <input
                type="text"
                value={currentSupplier}
                disabled
                className="input-field readonly"
              />
            </div>
          </div>

          {noPOSelect && (
            <div className="items-section">
              <h3>Daftar Item PO: {noPOSelect}</h3>
              <div className="table-responsive">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'center' }}>Ambil</th>
                      <th>No Item</th>
                      <th>Stockcode / Requestor</th>
                      <th>Deskripsi</th>
                      <th style={{ textAlign: 'center' }}>Outstanding</th>
                      <th style={{ width: '120px' }}>QTY Diterima</th>
                    </tr>
                  </thead>
                  <tbody>
                    {poItemsState.map((item, idx) => {
                      const isStock = item.stockCode && item.stockCode !== '';
                      return (
                        <tr key={idx}>
                          <td style={{ textAlign: 'center' }}>
                            <input
                              type="checkbox"
                              checked={item.checked}
                              onChange={(e) =>
                                handleItemPOChange(
                                  idx,
                                  'checked',
                                  e.target.checked
                                )
                              }
                            />
                          </td>
                          <td>
                            <strong>{item.poItemNo}</strong>
                          </td>
                          <td>
                            {isStock ? (
                              <span
                                style={{ color: '#00897B', fontWeight: 'bold' }}
                              >
                                {item.stockCode} (Stok)
                              </span>
                            ) : (
                              <span
                                style={{ color: '#E65100', fontSize: '13px' }}
                              >
                                {item.requestor} (PR)
                              </span>
                            )}
                          </td>
                          <td>{item.description}</td>
                          <td style={{ textAlign: 'center' }}>
                            <span className="qty-badge">
                              {item.qtyOutstanding}
                            </span>
                          </td>
                          <td>
                            <input
                              type="number"
                              value={item.qtyDiterima}
                              onChange={(e) =>
                                handleItemPOChange(
                                  idx,
                                  'qtyDiterima',
                                  parseInt(e.target.value) || 0
                                )
                              }
                              className="input-field"
                              style={{
                                padding: '4px 8px',
                                textAlign: 'center',
                                fontWeight: 'bold',
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-submit"
            style={{ marginTop: '20px' }}
          >
            {isSubmitting
              ? 'Memproses Penerimaan...'
              : 'SUBMIT PENERIMAAN BARANG'}
          </button>
        </form>
      )}

      {subTab === 'cekpo' && (
        <div>
          <div
            className="form-group"
            style={{ maxWidth: '400px', marginBottom: '20px' }}
          >
            <label>Cari Berdasarkan Nomor PO</label>
            <input
              type="text"
              placeholder="Masukkan Nomor PO..."
              value={searchCekPO}
              onChange={(e) => setSearchCekPO(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>No PO</th>
                  <th>No Item</th>
                  <th>Stock / Requestor (User)</th>
                  <th>Deskripsi</th>
                  <th>No DO</th>
                  <th>Supplier</th>
                  <th style={{ textAlign: 'center' }}>QTY Diterima</th>
                </tr>
              </thead>
              <tbody>
                {isLoadingHistory ? (
                  <tr>
                    <td
                      colSpan="8"
                      style={{
                        textAlign: 'center',
                        padding: '20px',
                        color: '#888',
                      }}
                    >
                      Memuat riwayat penerimaan dari Google Sheets...
                    </td>
                  </tr>
                ) : hasilCekPO.length === 0 ? (
                  <tr>
                    <td
                      colSpan="8"
                      style={{
                        textAlign: 'center',
                        padding: '20px',
                        color: '#888',
                      }}
                    >
                      Data penerimaan PO tidak ditemukan.
                    </td>
                  </tr>
                ) : (
                  hasilCekPO.map((item, idx) => {
                    const isStock = item.stockCode && item.stockCode !== '';
                    return (
                      <tr key={idx}>
                        <td>{item.tanggal}</td>
                        <td>
                          <strong style={{ color: '#00897B' }}>
                            {item.poNo}
                          </strong>
                        </td>
                        <td>{item.poItemNo}</td>
                        <td>
                          {isStock ? (
                            <span
                              style={{ color: '#00897B', fontWeight: 'bold' }}
                            >
                              {item.stockCode} (Stok)
                            </span>
                          ) : (
                            <span
                              style={{ color: '#E65100', fontSize: '13px' }}
                            >
                              {item.userOrRequestor} (PR)
                            </span>
                          )}
                        </td>
                        <td>{item.description}</td>
                        <td>{item.noDO}</td>
                        <td>{item.supplier}</td>
                        <td style={{ textAlign: 'center' }}>
                          <span
                            className="qty-badge"
                            style={{
                              backgroundColor: '#e0f2f1',
                              color: '#00695c',
                            }}
                          >
                            {item.qty}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// --- MENU 5: DAILY STOCKTAKING (URL DST KHUSUS & DATA DINAMIS BATCH) ---
function HalamanStocktaking() {
  const navigate = useNavigate();
  const [tglStocktaking, setTglStocktaking] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [pic, setPic] = useState(''); // TAMBAHAN PIC (Dibutuhkan backend)
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notif, setNotif] = useState({ show: false, pesan: '', tipe: '' });

  // FUNGSI LOAD DATA DARI URL DST
  const loadStocktakingBatch = (isRefresh = false) => {
    const cachedBatch = localStorage.getItem('wms_dst_batch_items');
    const cachedTimestamp = localStorage.getItem('wms_dst_timestamp');
    const now = new Date().getTime();
    const twelveHours = 12 * 60 * 60 * 1000;

    if (
      cachedBatch &&
      cachedTimestamp &&
      !isRefresh &&
      now - parseInt(cachedTimestamp) < twelveHours
    ) {
      setItems(JSON.parse(cachedBatch));
    } else {
      setIsLoading(true);
      fetch(`${GSHEET_DST_URL}?action=getStocktakingData`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            const selected5 = data.slice(0, 5).map((item) => ({
              ...item,
              actual: item.soh,
            }));
            setItems(selected5);
            localStorage.setItem(
              'wms_dst_batch_items',
              JSON.stringify(selected5)
            );
            localStorage.setItem('wms_dst_timestamp', now.toString());
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.error('Gagal memuat data stocktaking:', err);
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    loadStocktakingBatch(false);
  }, []);

  const handleQtyAktualChange = (index, value) => {
    const updated = [...items];
    updated[index].actual = value;
    setItems(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pic) {
      setNotif({
        show: true,
        pesan: 'Harap pilih PIC / Warehouseman!',
        tipe: 'error',
      });
      return;
    }

    setIsSubmitting(true);
    setNotif({ show: false, pesan: '', tipe: '' });

    fetch(GSHEET_DST_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        action: 'saveStocktaking',
        pic: pic,
        items: items,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsSubmitting(false);
        if (data.status === 'success') {
          setNotif({
            show: true,
            pesan: 'Daily Stocktaking Berhasil Disimpan!',
            tipe: 'success',
          });
          localStorage.removeItem('wms_dst_batch_items');
          localStorage.removeItem('wms_dst_timestamp');
          setTimeout(() => loadStocktakingBatch(true), 1500);
        } else {
          setNotif({
            show: true,
            pesan: 'Gagal menyimpan stocktaking.',
            tipe: 'error',
          });
        }
      })
      .catch((err) => {
        setIsSubmitting(false);
        setNotif({
          show: true,
          pesan: 'Terjadi kesalahan koneksi.',
          tipe: 'error',
        });
      });
  };

  return (
    <div className="page-box">
      <div
        className="page-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={() => navigate(-1)} className="btn-back">
            <ArrowLeft size={18} /> Kembali
          </button>
          <h2>Daily Stocktaking</h2>
        </div>
        <button
          onClick={() => loadStocktakingBatch(true)}
          className="btn-back"
          style={{ background: '#00897B', color: '#fff', border: 'none' }}
        >
          <RefreshCw size={16} className={isLoading ? 'fa-spin' : ''} /> Refresh
          Batch 12 Jam
        </button>
      </div>

      {notif.show && (
        <div className={`notif-banner ${notif.tipe}`}>
          {notif.tipe === 'success' ? (
            <CheckCircle2 size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <span>{notif.pesan}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div
          className="grid-2col"
          style={{ marginBottom: '20px', maxWidth: '600px' }}
        >
          <div className="form-group">
            <label>Tanggal Stocktaking</label>
            <input
              type="date"
              value={tglStocktaking}
              onChange={(e) => setTglStocktaking(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>Pilih PIC / Warehouseman *</label>
            <select
              value={pic}
              onChange={(e) => setPic(e.target.value)}
              className="input-field"
            >
              <option value="">-- Pilih PIC --</option>
              <option value="ARI">ARI</option>
              <option value="SYAM">SYAM</option>
              <option value="UPHIK">UPHIK</option>
            </select>
          </div>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>SC (Stockcode)</th>
                <th>Deskripsi Barang</th>
                <th>Location</th>
                <th style={{ textAlign: 'center' }}>QTY Sistem</th>
                <th style={{ width: '130px', textAlign: 'center' }}>
                  QTY Aktual
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading && items.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: 'center',
                      padding: '20px',
                      color: '#888',
                    }}
                  >
                    Memuat data stockcode dari server...
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: 'center',
                      padding: '20px',
                      color: '#888',
                    }}
                  >
                    Semua item di sheet DATA sudah selesai di-stocktaking!
                  </td>
                </tr>
              ) : (
                items.map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <strong style={{ color: '#00897B' }}>
                        {item.stockCode}
                      </strong>
                    </td>
                    <td>{item.description}</td>
                    <td>
                      <span
                        className="type-badge"
                        style={{ backgroundColor: '#f0f4c3', color: '#827717' }}
                      >
                        {item.binCode}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <strong>{item.soh}</strong>
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item.actual}
                        onChange={(e) =>
                          handleQtyAktualChange(
                            idx,
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="input-field"
                        style={{ textAlign: 'center', fontWeight: 'bold' }}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || items.length === 0}
          className="btn-submit"
          style={{ marginTop: '20px' }}
        >
          {isSubmitting
            ? 'Menyimpan Stocktaking...'
            : 'SUBMIT DAILY STOCKTAKING'}
        </button>
      </form>
    </div>
  );
}

// --- APP MAIN WRAPPER ---
export default function App() {
  const [layoutMode, setLayoutMode] = useState('sidebar');

  return (
    <Router>
      <MainLayout layoutMode={layoutMode} setLayoutMode={setLayoutMode}>
        <Routes>
          <Route path="/" element={<HalamanDashboard />} />
          <Route path="/pencatatan" element={<HalamanPencatatan />} />
          <Route path="/tools" element={<HalamanTools />} />
          <Route path="/stok" element={<HalamanStok />} />
          <Route path="/po" element={<HalamanPO />} />
          <Route path="/stocktaking" element={<HalamanStocktaking />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}
