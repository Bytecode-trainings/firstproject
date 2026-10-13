import Lead from '../models/Lead.js';

const memoryLeads = [];

export const createLead = async (req, res) => {
  try {
    const { name, email, phone, course, batch } = req.body;

    if (!name || !email || !phone || !course) {
      return res.status(400).json({ success: false, message: 'Please provide all required inquiry details.' });
    }

    try {
      const lead = await Lead.create({
        name,
        email,
        phone,
        course,
        batch: batch || 'weekend',
      });

      return res.status(201).json({
        success: true,
        message: `Inquiry submitted successfully for ${course}! Our counselor will reach out shortly.`,
        lead,
      });
    } catch (dbErr) {
      console.warn('MongoDB Lead create fallback to memory:', dbErr.message);
      const newLead = {
        _id: 'lead_' + Date.now(),
        name,
        email,
        phone,
        course,
        batch: batch || 'weekend',
        createdAt: new Date(),
      };
      memoryLeads.push(newLead);

      return res.status(201).json({
        success: true,
        message: `Inquiry submitted successfully for ${course}! Our counselor will reach out shortly.`,
        lead: newLead,
      });
    }
  } catch (error) {
    console.error('Lead Submission Error:', error);
    res.status(500).json({ success: false, message: 'Server error processing inquiry.' });
  }
};

export const getLeads = async (req, res) => {
  try {
    try {
      const leads = await Lead.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: leads.length, leads });
    } catch (err) {
      return res.json({ success: true, count: memoryLeads.length, leads: memoryLeads });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve leads.' });
  }
};
