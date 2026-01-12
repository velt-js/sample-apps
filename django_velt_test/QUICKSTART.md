# Quick Start Guide - MongoDB Atlas Setup

## Using Individual Components (Your Setup)

Based on your connection string:

```
mongodb+srv://eng_db_user:pAS6b4RCSkLZI7Wf@cluster0.8belzzg.mongodb.net/?appName=Cluster0&retryWrites=true&w=majority
```

### Option 1: Set Environment Variables

```bash
export VELT_MONGODB_HOST=cluster0.8belzzg.mongodb.net
export VELT_MONGODB_USERNAME=eng_db_user
export VELT_MONGODB_PASSWORD=pAS6b4RCSkLZI7Wf
export VELT_MONGODB_AUTH_DB=admin
export VELT_MONGODB_DATABASE=velt-integration
```

### Option 2: Edit settings.py Directly

The settings.py file already has your credentials as defaults. Just make sure the database name is set:

```python
'database_name': os.getenv('VELT_MONGODB_DATABASE', 'velt-integration')
```

### Option 3: Use Connection String (Alternative)

If you prefer to use the full connection string:

```bash
export VELT_MONGODB_CONNECTION_STRING="mongodb+srv://eng_db_user:pAS6b4RCSkLZI7Wf@cluster0.8belzzg.mongodb.net/velt-integration?retryWrites=true&w=majority"
```

## Run the App

1. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

2. **Run the server:**

   ```bash
   python manage.py runserver
   ```

3. **Test it:**
   ```bash
   python test_api.py
   ```

## Important Notes

- The SDK automatically detects `.mongodb.net` domains and uses `mongodb+srv://` protocol
- Make sure your IP address is whitelisted in MongoDB Atlas Network Access
- The database will be created automatically when you first save data
- Default database name is `velt-integration` (you can change it)
