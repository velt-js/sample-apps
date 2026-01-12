"""
Pytest fixtures for Velt SDK tests
"""
import pytest
from velt_integration.tests.test_utils import get_mock_database, get_mock_config, cleanup


@pytest.fixture
def mock_database():
    """Provide a mock MongoDB database"""
    db = get_mock_database()
    yield db
    # Cleanup after test
    db.client.drop_database('test_db')


@pytest.fixture
def mock_config():
    """Provide a mock configuration"""
    return get_mock_config()


@pytest.fixture(autouse=True)
def reset_connections():
    """Reset connections before and after each test"""
    cleanup()
    yield
    cleanup()

